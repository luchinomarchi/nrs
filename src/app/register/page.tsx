"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      // Simulação de cadastro
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess("Cadastro realizado com sucesso! Você já pode fazer login.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Ocorreu um erro ao realizar o cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="header-gradient text-white">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-nrs.svg" alt="NRS" className="h-8 w-8" />
            {/* Removido o span conforme solicitado */}
            Nossa Ronda Solidária
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/" className="hover:underline">Início</Link>
            <Link href="/about" className="hover:underline">Saiba Mais</Link>
            <Link href="/login" className="btn-primary px-4 py-2">Entrar</Link>
          </nav>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="card-primary p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Crie sua conta</h1>
          <p className="text-gray-600 mb-6">Cadastre-se para participar das ações da Nossa Ronda Solidária.</p>

          {error && (
            <div className="bg-red-50 text-red-700 border border-red-200 rounded p-3 mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-700 border border-green-200 rounded p-3 mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="seu-email@exemplo.com"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Mínimo de 6 caracteres"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Confirmar senha</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-md border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Repita a senha"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-5 py-2"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4">
            Já tem conta? <Link href="/login" className="text-primary-700 hover:underline">Faça login</Link>
          </p>

          <div className="mt-6 text-xs text-gray-500">
            Este cadastro é uma simulação. Em produção, conectaremos com o banco de dados (PostgreSQL/Prisma) e NextAuth para criação real de contas.
          </div>
        </div>
      </main>
    </div>
  );
}