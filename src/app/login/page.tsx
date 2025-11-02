'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

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

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError('Email ou senha inválidos ou aprovação pendente');
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('Ocorreu um erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col md:flex-row">
      {/* Left Panel - Information */}
      <div className="md:w-1/2 header-gradient text-white p-8 md:p-12 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-8">
            <Image 
              src="/logo-nrs.png" 
              alt="Nossa Ronda Solidária" 
              width={200} 
              height={50}
              className="h-12 w-auto filter brightness-0 invert"
            />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Transforme vidas através do voluntariado</h2>
          <p className="text-primary-200 mb-8">
            Junte-se a centenas de voluntários que estão fazendo a diferença na vida de pessoas em situação de vulnerabilidade.
          </p>
        </div>
        
        <div className="mt-auto">
          <div className="border-t border-primary-500 pt-6 mt-6">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <Link href="/forgot" className="text-sm text-primary-700 hover:text-primary-800">
                  Esqueceu a senha?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-700 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Lembrar de mim
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary"
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
                onClick={() => signIn('google')}
                className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Google
              </button>
              <button
                type="button"
                disabled
                className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-300 cursor-not-allowed"
              >
                Facebook (em breve)
              </button>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link href="/register" className="font-medium text-primary-700 hover:text-primary-600">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}