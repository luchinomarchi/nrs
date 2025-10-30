'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulação de login bem-sucedido
    try {
      // Em uma implementação real, isso seria uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulando login bem-sucedido para admin
      if (email === 'admin@nossaronda.org' && password === 'admin123') {
        router.push('/admin/dashboard');
      } 
      // Simulando login bem-sucedido para voluntário
      else if (email === 'voluntario@nossaronda.org' && password === 'voluntario123') {
        router.push('/voluntario/perfil');
      } 
      // Simulando erro de login
      else {
        setError('Email ou senha inválidos');
      }
    } catch (err) {
      setError('Ocorreu um erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-100 to-white flex flex-col md:flex-row">
      {/* Left Panel - Information */}
      <div className="md:w-1/2 bg-teal-700 text-white p-8 md:p-12 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 mr-3 rounded-full bg-white flex items-center justify-center text-teal-700 font-bold">
              NR
            </div>
            <h1 className="text-2xl font-bold">Nossa Ronda Solidária</h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Transforme vidas através do voluntariado</h2>
          <p className="text-teal-200 mb-8">
            Junte-se a centenas de voluntários que estão fazendo a diferença na vida de pessoas em situação de vulnerabilidade.
          </p>
        </div>
        
        <div className="mt-auto">
          <div className="border-t border-teal-600 pt-6 mt-6">
            <h3 className="font-semibold mb-4">O que nossos voluntários dizem:</h3>
            <div className="mb-4">
              <p className="italic mb-2">
                "Participar da Nossa Ronda Solidária mudou minha perspectiva sobre o voluntariado. É incrível ver como pequenas ações podem fazer grande diferença."
              </p>
              <p className="text-sm">— Ana Silva, Voluntária há 2 anos</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Panel - Login Form */}
      <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Bem-vindo de volta</h2>
            <p className="text-gray-600">Entre com suas credenciais para acessar sua conta</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <Link href="/forgot-password" className="text-sm text-teal-700 hover:text-teal-800">
                  Esqueceu a senha?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-teal-700 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Lembrar de mim
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continue com</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Google
              </button>
              <button
                type="button"
                className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Facebook
              </button>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link href="/register" className="font-medium text-teal-700 hover:text-teal-600">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}