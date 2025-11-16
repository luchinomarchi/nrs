import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import { verifyPassword } from "./auth";

export const authOptions: AuthOptions = {
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
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user || !user.password) return null;
        const ok = await verifyPassword(credentials.password, user.password);
        if (!ok) return null;
        return { id: user.id, name: user.name || undefined, email: user.email || undefined, role: user.role, approved: user.approved } as any;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const dbUser = await prisma.user.findUnique({ where: { email: user.email || "" } });
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
            return false;
          }
          if (!dbUser.approved) return false;
          return true;
        }
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

