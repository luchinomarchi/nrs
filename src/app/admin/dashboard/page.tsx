'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Dados simulados para o dashboard
const mockData = {
  stats: {
    voluntariosAtivos: 128,
    proximosEventos: 5,
    checkinsRealizados: 87,
    equipesAtivas: 8
  },
  voluntarios: [
    { id: 1, nome: 'Ana Silva', email: 'ana.silva@email.com', equipe: 'Logística', participacoes: 24, pontos: 480, status: 'Ativo' },
    { id: 2, nome: 'Carlos Oliveira', email: 'carlos.oliveira@email.com', equipe: 'Cozinha', participacoes: 18, pontos: 360, status: 'Ativo' },
    { id: 3, nome: 'Mariana Santos', email: 'mariana.santos@email.com', equipe: 'Atendimento', participacoes: 15, pontos: 300, status: 'Ativo' },
    { id: 4, nome: 'Pedro Costa', email: 'pedro.costa@email.com', equipe: 'Logística', participacoes: 12, pontos: 240, status: 'Ativo' },
    { id: 5, nome: 'Juliana Lima', email: 'juliana.lima@email.com', equipe: 'Cozinha', participacoes: 8, pontos: 160, status: 'Pendente' }
  ]
};

export default function AdminDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 header-gradient text-white min-h-screen fixed">
          <div className="p-4 border-b border-primary-500">
            <div className="flex items-center">
              <Image 
                src="/logo-nrs.png" 
                alt="Nossa Ronda Solidária" 
                width={160} 
                height={40}
                className="h-8 w-auto filter brightness-0 invert"
              />
            </div>
          </div>
          
          <nav className="mt-4">
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'dashboard' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('dashboard')}
            >
              <span className="mr-3">📊</span>
              <span>Dashboard</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'voluntarios' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('voluntarios')}
            >
              <span className="mr-3">👥</span>
              <span>Voluntários</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'eventos' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('eventos')}
            >
              <span className="mr-3">📅</span>
              <span>Eventos</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'checkins' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('checkins')}
            >
              <span className="mr-3">✓</span>
              <span>Check-ins</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'conquistas' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('conquistas')}
            >
              <span className="mr-3">🏆</span>
              <span>Conquistas</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'equipes' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('equipes')}
            >
              <span className="mr-3">👥</span>
              <span>Equipes</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'comunicacoes' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('comunicacoes')}
            >
              <span className="mr-3">📨</span>
              <span>Comunicações</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'configuracoes' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('configuracoes')}
            >
              <span className="mr-3">⚙️</span>
              <span>Configurações</span>
            </a>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          <div className="flex justify-between items-center mb-8 pb-4 border-b">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            
            <div className="flex items-center">
              <div className="relative mr-4">
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-2"></div>
                <span>Admin</span>
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card-primary rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm">Voluntários Ativos</h3>
                  <p className="text-2xl font-semibold">{mockData.stats.voluntariosAtivos}</p>
                </div>
                <div className="p-2 rounded-full bg-primary-100 text-primary-700">👥</div>
              </div>
              <p className="text-green-500 text-sm">+12% desde o mês passado</p>
            </div>
            
            <div className="card-primary rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm">Próximos Eventos</h3>
                  <p className="text-2xl font-semibold">{mockData.stats.proximosEventos}</p>
                </div>
                <div className="p-2 rounded-full bg-secondary-100 text-secondary-700">📅</div>
              </div>
              <p className="text-green-500 text-sm">+2 novos eventos</p>
            </div>
            
            <div className="card-primary rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm">Check-ins Realizados</h3>
                  <p className="text-2xl font-semibold">{mockData.stats.checkinsRealizados}</p>
                </div>
                <div className="p-2 rounded-full bg-accent-100 text-accent-700">✓</div>
              </div>
              <p className="text-green-500 text-sm">+23% desde o último evento</p>
            </div>
            
            <div className="card-primary rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm">Equipes Ativas</h3>
                  <p className="text-2xl font-semibold">{mockData.stats.equipesAtivas}</p>
                </div>
                <div className="p-2 rounded-full bg-purple-100 text-purple-700">👥</div>
              </div>
              <p className="text-green-500 text-sm">+1 nova equipe</p>
            </div>
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="card-primary rounded-lg shadow p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Engajamento de Voluntários</h3>
                <select className="border rounded px-2 py-1 text-sm">
                  <option>Últimos 30 dias</option>
                  <option>Últimos 90 dias</option>
                  <option>Este ano</option>
                </select>
              </div>
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                [Gráfico de Engajamento de Voluntários]
              </div>
            </div>
            
            <div className="card-primary rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Distribuição por Equipe</h3>
                <select className="border rounded px-2 py-1 text-sm">
                  <option>Todos</option>
                  <option>Ativos</option>
                  <option>Inativos</option>
                </select>
              </div>
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                [Gráfico de Pizza]
              </div>
            </div>
          </div>
          
          {/* Volunteers Table */}
          <div className="card-primary rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-semibold">Voluntários por Frequência</h3>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border rounded text-sm hover:bg-gray-50">
                  Exportar
                </button>
                <button className="btn-primary text-sm">
                  + Adicionar
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Equipe
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participações
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pontos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockData.voluntarios.map((voluntario) => (
                    <tr key={voluntario.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {voluntario.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {voluntario.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {voluntario.equipe}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {voluntario.participacoes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {voluntario.pontos}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          voluntario.status === 'Ativo' 
                            ? 'bg-secondary-100 text-secondary-800' 
                            : 'bg-accent-100 text-accent-800'
                        }`}>
                          {voluntario.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 flex items-center justify-between border-t">
              <div className="text-sm text-gray-500">
                Mostrando 1-5 de 128 voluntários
              </div>
              <div className="flex space-x-1">
                <button className="w-8 h-8 flex items-center justify-center rounded bg-primary-700 text-white">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                  3
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                  ...
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                  26
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}