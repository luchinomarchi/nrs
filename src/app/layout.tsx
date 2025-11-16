import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  title: "Nossa Ronda Solidária",
  description: "Sistema de apoio a ações solidárias e voluntariado",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`min-h-screen bg-gray-50 text-gray-900 antialiased ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
