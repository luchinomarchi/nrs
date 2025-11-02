import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/src/lib/prisma";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        // Simulação temporária enquanto não conectamos o banco
        const users = [
          { id: "1", name: "Admin", email: "admin@nrs.org", password: "admin", role: "admin", approved: true },
          { id: "2", name: "Voluntário", email: "voluntario@nrs.org", password: "voluntario", role: "voluntario", approved: false },
        ];
        const user = users.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );
        if (!user) return null;
        return { id: user.id, name: user.name, email: user.email, role: user.role, approved: user.approved } as any;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Bloquear login se o usuário não estiver aprovado
      // Para OAuth (Google), precisamos checar no banco com Prisma
      try {
        if (account?.provider === "google") {
          const dbUser = await prisma.user.findUnique({ where: { email: user.email || "" } });
          // Se não existir, cria com approved=false
          if (!dbUser) {
            await prisma.user.create({
              data: {
                name: user.name || "",
                email: user.email || "",
                image: user.image || undefined,
                approved: false,
                role: "voluntario",
              },
            });
            return false; // impede login até aprovação
          }
          if (!dbUser.approved) return false;
          return true;
        }
        // Credenciais simuladas
        if ((user as any)?.approved === false) return false;
        return true;
      } catch (e) {
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role ?? token.role;
        token.approved = (user as any).approved ?? token.approved;
      } else {
        // sincroniza do banco quando possível
        if (token.email) {
          try {
            const dbUser = await prisma.user.findUnique({ where: { email: token.email as string } });
            if (dbUser) {
              token.role = dbUser.role;
              token.approved = dbUser.approved;
            }
          } catch {}
        }
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).role = token.role;
      (session as any).approved = token.approved;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login?error=approval_required",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };