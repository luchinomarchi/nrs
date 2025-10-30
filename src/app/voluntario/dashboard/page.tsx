'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Dados simulados para o dashboard do voluntário
const mockData = {
  voluntario: {
    nome: 'Maria Silva',
    email: 'maria.silva@email.com',
    equipe: 'Logística',
    participacoes: 24,
    pontos: 480,
    nivel: 'Prata',
    proximoNivel: 'Ouro',
    pontosParaProximoNivel: 120
  },
  conquistas: [
    { id: 1, nome: 'Primeiro Check-in', descricao: 'Realizou seu primeiro check-in em um evento', icone: '🏆', desbloqueada: true },
    { id: 2, nome: 'Voluntário Dedicado', descricao: 'Participou de 10 eventos', icone: '⭐', desbloqueada: true },
    { id: 3, nome: 'Voluntário Constante', descricao: 'Participou de 3 eventos consecutivos', icone: '🔄', desbloqueada: true },
    { id: 4, nome: 'Voluntário Experiente', descricao: 'Participou de 25 eventos', icone: '🌟', desbloqueada: false },
    { id: 5, nome: 'Líder de Equipe', descricao: 'Liderou uma equipe em um evento', icone: '👑', desbloqueada: false }
  ],
  proximosEventos: [
    { id: 1, nome: 'Distribuição de Alimentos', data: '15/06/2023', horario: '09:00 - 12:00', local: 'Centro Comunitário', inscrito: true },
    { id: 2, nome: 'Arrecadação de Agasalhos', data: '22/06/2023', horario: '14:00 - 17:00', local: 'Praça Central', inscrito: false },
    { id: 3, nome: 'Atendimento Médico', data: '30/06/2023', horario: '08:00 - 16:00', local: 'Escola Municipal', inscrito: false }
  ],
  historicoPresenca: [
    { id: 1, evento: 'Distribuição de Alimentos', data: '01/05/2023', status: 'Presente', pontos: 20 },
    { id: 2, evento: 'Arrecadação de Agasalhos', data: '15/05/2023', status: 'Presente', pontos: 20 },
    { id: 3, evento: 'Atendimento Médico', data: '22/05/2023', status: 'Presente', pontos: 20 },
    { id: 4, evento: 'Distribuição de Alimentos', data: '01/06/2023', status: 'Presente', pontos: 20 },
    { id: 5, evento: 'Arrecadação de Agasalhos', data: '08/06/2023', status: 'Ausente', pontos: 0 }
  ]
};

export default function VoluntarioDashboard() {
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
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'equipe' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('equipe')}
            >
              <span className="mr-3">👥</span>
              <span>Minha Equipe</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'perfil' ? 'bg-teal-700' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveMenuItem('perfil')}
            >
              <span className="mr-3">👤</span>
              <span>Meu Perfil</span>
            </a>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          <div className="flex justify-between items-center mb-8 pb-4 border-b">
            <h1 className="text-2xl font-semibold">Meu Dashboard</h1>
            
            <div className="flex items-center">
              <div className="relative mr-4">
                <input 
                  type="text" 
                  placeholder="Buscar eventos..." 
                  className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center text-white mr-2">
                  MS
                </div>
                <span>{mockData.voluntario.nome}</span>
              </div>
            </div>
          </div>
          
          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 flex flex-col items-center mb-6 md:mb-0">
                <div className="w-32 h-32 rounded-full bg-teal-700 flex items-center justify-center text-white text-4xl mb-4">
                MS
              </div>
              <h2 className="text-xl font-semibold">{mockData.voluntario.nome}</h2>
              <p className="text-gray-500">{mockData.voluntario.email}</p>
              <div className="mt-2 px-4 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                  Equipe: {mockData.voluntario.equipe}
                </div>
              </div>
              
              <div className="md:w-3/4 md:pl-8 md:border-l">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-gray-500 text-sm mb-1">Participações</h3>
                    <p className="text-2xl font-semibold">{mockData.voluntario.participacoes}</p>
                    <p className="text-green-500 text-sm">+3 este mês</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-gray-500 text-sm mb-1">Pontos</h3>
                    <p className="text-2xl font-semibold">{mockData.voluntario.pontos}</p>
                    <p className="text-green-500 text-sm">+60 este mês</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-gray-500 text-sm mb-1">Nível</h3>
                    <p className="text-2xl font-semibold">{mockData.voluntario.nivel}</p>
                    <div className="mt-2">
                      <div className="text-xs text-gray-500 flex justify-between mb-1">
                        <span>Progresso para {mockData.voluntario.proximoNivel}</span>
                        <span>{mockData.voluntario.pontos}/{mockData.voluntario.pontos + mockData.voluntario.pontosParaProximoNivel}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-teal-700 h-2 rounded-full" 
                          style={{ width: `${(mockData.voluntario.pontos / (mockData.voluntario.pontos + mockData.voluntario.pontosParaProximoNivel)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Achievements Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Minhas Conquistas</h2>
              <a href="#" className="text-teal-700 hover:text-teal-800">Ver todas</a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.conquistas.map((conquista) => (
                <div 
                  key={conquista.id} 
                  className={`p-4 rounded-lg border ${conquista.desbloqueada ? 'bg-white' : 'bg-gray-100 opacity-60'}`}
                >
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">{conquista.icone}</div>
                    <div>
                      <h3 className="font-semibold">{conquista.nome}</h3>
                      <p className="text-sm text-gray-500">{conquista.descricao}</p>
                      {conquista.desbloqueada ? (
                        <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Desbloqueada
                        </span>
                      ) : (
                        <span className="inline-block mt-2 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                          Bloqueada
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Upcoming Events Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Próximos Eventos</h2>
                <a href="#" className="text-teal-700 hover:text-teal-800">Ver todos</a>
              </div>
              
              <div className="space-y-4">
                {mockData.proximosEventos.map((evento) => (
                  <div key={evento.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{evento.nome}</h3>
                        <p className="text-sm text-gray-500">
                          {evento.data} • {evento.horario} • {evento.local}
                        </p>
                      </div>
                      {evento.inscrito ? (
                        <button className="px-4 py-2 bg-green-100 text-green-800 rounded text-sm">
                          Inscrito
                        </button>
                      ) : (
                        <button className="px-4 py-2 bg-teal-700 text-white rounded text-sm hover:bg-teal-800">
                        Inscrever-se
                      </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Attendance History */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Histórico de Presença</h2>
                <a href="#" className="text-teal-700 hover:text-teal-800">Ver tudo</a>
              </div>
              
              <div className="space-y-4">
                {mockData.historicoPresenca.map((presenca) => (
                  <div key={presenca.id} className="flex items-center justify-between p-3 border-b">
                    <div>
                      <h3 className="font-medium">{presenca.evento}</h3>
                      <p className="text-sm text-gray-500">{presenca.data}</p>
                    </div>
                    <div className="flex items-center">
                      <span 
                        className={`inline-block px-2 py-1 rounded-full text-xs mr-2 ${
                          presenca.status === 'Presente' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {presenca.status}
                      </span>
                      {presenca.pontos > 0 && (
                        <span className="text-sm font-medium text-teal-700">
                          +{presenca.pontos} pontos
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}