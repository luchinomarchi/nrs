'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Dados simulados para as conquistas
const mockData = {
  voluntario: {
    nome: 'Maria Silva',
    nivel: 'Prata',
    pontos: 480,
    proximoNivel: 'Ouro',
    pontosParaProximoNivel: 120
  },
  niveis: [
    { id: 1, nome: 'Bronze', pontosNecessarios: 0, icone: '🥉', atual: false, completo: true },
    { id: 2, nome: 'Prata', pontosNecessarios: 300, icone: '🥈', atual: true, completo: false },
    { id: 3, nome: 'Ouro', pontosNecessarios: 600, icone: '🥇', atual: false, completo: false },
    { id: 4, nome: 'Platina', pontosNecessarios: 1000, icone: '💎', atual: false, completo: false },
    { id: 5, nome: 'Diamante', pontosNecessarios: 2000, icone: '👑', atual: false, completo: false }
  ],
  categorias: [
    { id: 1, nome: 'Participação', icone: '📅' },
    { id: 2, nome: 'Liderança', icone: '👑' },
    { id: 3, nome: 'Constância', icone: '🔄' },
    { id: 4, nome: 'Especial', icone: '⭐' }
  ],
  conquistas: [
    { 
      id: 1, 
      nome: 'Primeiro Check-in', 
      descricao: 'Realizou seu primeiro check-in em um evento', 
      icone: '🏆', 
      categoria: 'Participação',
      pontos: 20,
      progresso: 100,
      desbloqueada: true,
      data: '01/05/2023'
    },
    { 
      id: 2, 
      nome: 'Voluntário Dedicado', 
      descricao: 'Participou de 10 eventos', 
      icone: '⭐', 
      categoria: 'Participação',
      pontos: 50,
      progresso: 100,
      desbloqueada: true,
      data: '15/05/2023'
    },
    { 
      id: 3, 
      nome: 'Voluntário Constante', 
      descricao: 'Participou de 3 eventos consecutivos', 
      icone: '🔄', 
      categoria: 'Constância',
      pontos: 30,
      progresso: 100,
      desbloqueada: true,
      data: '22/05/2023'
    },
    { 
      id: 4, 
      nome: 'Voluntário Experiente', 
      descricao: 'Participou de 25 eventos', 
      icone: '🌟', 
      categoria: 'Participação',
      pontos: 100,
      progresso: 24/25 * 100,
      desbloqueada: false,
      data: null
    },
    { 
      id: 5, 
      nome: 'Líder de Equipe', 
      descricao: 'Liderou uma equipe em um evento', 
      icone: '👑', 
      categoria: 'Liderança',
      pontos: 75,
      progresso: 0,
      desbloqueada: false,
      data: null
    },
    { 
      id: 6, 
      nome: 'Voluntário do Mês', 
      descricao: 'Foi eleito voluntário do mês pela coordenação', 
      icone: '🏅', 
      categoria: 'Especial',
      pontos: 100,
      progresso: 0,
      desbloqueada: false,
      data: null
    },
    { 
      id: 7, 
      nome: 'Maratona Solidária', 
      descricao: 'Participou de 5 eventos em um único mês', 
      icone: '🏃', 
      categoria: 'Constância',
      pontos: 80,
      progresso: 60,
      desbloqueada: false,
      data: null
    },
    { 
      id: 8, 
      nome: 'Aniversariante', 
      descricao: 'Completou 1 ano como voluntário', 
      icone: '🎂', 
      categoria: 'Especial',
      pontos: 150,
      progresso: 0,
      desbloqueada: false,
      data: null
    }
  ]
};

export default function ConquistasPage() {
  const [activeMenuItem, setActiveMenuItem] = useState('conquistas');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [filtroStatus, setFiltroStatus] = useState('Todas');
  
  // Filtra conquistas com base nos critérios
  const conquistasFiltradas = mockData.conquistas.filter(conquista => {
    const matchesCategoria = filtroCategoria === 'Todas' || conquista.categoria === filtroCategoria;
    const matchesStatus = filtroStatus === 'Todas' || 
                         (filtroStatus === 'Desbloqueadas' && conquista.desbloqueada) ||
                         (filtroStatus === 'Bloqueadas' && !conquista.desbloqueada);
    return matchesCategoria && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white min-h-screen fixed">
          <div className="p-4 border-b border-gray-700">
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
            <Link 
              href="/voluntario/dashboard" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'dashboard' ? 'bg-teal-700' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveMenuItem('dashboard')}
            >
              <span className="mr-3">📊</span>
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/eventos" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'eventos' ? 'bg-teal-700' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveMenuItem('eventos')}
            >
              <span className="mr-3">📅</span>
              <span>Eventos</span>
            </Link>
            <Link 
              href="/checkin" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'checkins' ? 'bg-teal-700' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveMenuItem('checkins')}
            >
              <span className="mr-3">✓</span>
              <span>Check-ins</span>
            </Link>
            <Link 
              href="/voluntario/conquistas" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'conquistas' ? 'bg-teal-700' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveMenuItem('conquistas')}
            >
              <span className="mr-3">🏆</span>
              <span>Conquistas</span>
            </Link>
            <Link 
              href="/voluntario/equipe" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'equipe' ? 'bg-teal-700' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveMenuItem('equipe')}
            >
              <span className="mr-3">👥</span>
              <span>Minha Equipe</span>
            </Link>
            <Link 
              href="/voluntario/perfil" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'perfil' ? 'bg-teal-700' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveMenuItem('perfil')}
            >
              <span className="mr-3">👤</span>
              <span>Meu Perfil</span>
            </Link>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          <div className="flex justify-between items-center mb-8 pb-4 border-b">
            <h1 className="text-2xl font-semibold">Minhas Conquistas</h1>
            
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center text-white mr-2">
                  MS
                </div>
                <span>{mockData.voluntario.nome}</span>
              </div>
            </div>
          </div>
          
          {/* Nível e Progresso */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Meu Nível</h2>
            
            <div className="flex flex-wrap gap-4">
              {mockData.niveis.map((nivel) => (
                <div 
                  key={nivel.id} 
                  className={`flex-1 min-w-[150px] p-4 rounded-lg border ${
                    nivel.atual ? 'bg-teal-50 border-teal-300' : 
                    nivel.completo ? 'bg-green-50 border-green-300' : 
                    'bg-gray-50 border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-3xl mb-2">{nivel.icone}</div>
                    <h3 className="font-semibold">{nivel.nome}</h3>
                    <p className="text-sm text-gray-500">{nivel.pontosNecessarios} pontos</p>
                    {nivel.atual && (
                      <span className="mt-2 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                        Nível Atual
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Progresso para {mockData.voluntario.proximoNivel}</span>
                <span>{mockData.voluntario.pontos}/{mockData.voluntario.pontos + mockData.voluntario.pontosParaProximoNivel} pontos</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-teal-700 h-2.5 rounded-full" 
                  style={{ width: `${(mockData.voluntario.pontos / (mockData.voluntario.pontos + mockData.voluntario.pontosParaProximoNivel)) * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Faltam <span className="font-semibold">{mockData.voluntario.pontosParaProximoNivel} pontos</span> para o próximo nível
              </p>
            </div>
          </div>
          
          {/* Filtros */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <select 
                className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="Todas">Todas as Categorias</option>
                {mockData.categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.nome}>
                    {categoria.icone} {categoria.nome}
                  </option>
                ))}
              </select>
              
              <select 
                className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                <option value="Todas">Todos os Status</option>
                <option value="Desbloqueadas">Desbloqueadas</option>
                <option value="Bloqueadas">Bloqueadas</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-500">
              {conquistasFiltradas.filter(c => c.desbloqueada).length} de {mockData.conquistas.length} conquistas desbloqueadas
            </div>
          </div>
          
          {/* Conquistas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conquistasFiltradas.map((conquista) => (
              <div 
                key={conquista.id} 
                className={`bg-white rounded-lg shadow overflow-hidden ${
                  !conquista.desbloqueada ? 'opacity-75' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className={`text-4xl mr-4 ${!conquista.desbloqueada ? 'grayscale' : ''}`}>
                      {conquista.icone}
                    </div>
                    <div>
                      <h3 className="font-semibold">{conquista.nome}</h3>
                      <p className="text-sm text-gray-500 mt-1">{conquista.descricao}</p>
                      
                      <div className="mt-3 flex items-center">
                        <span className="text-teal-700 font-medium mr-2">+{conquista.pontos} pts</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          {conquista.categoria}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progresso</span>
                      <span>{Math.round(conquista.progresso)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${conquista.desbloqueada ? 'bg-green-500' : 'bg-teal-500'}`}
                        style={{ width: `${conquista.progresso}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className={`px-6 py-3 text-sm border-t ${
                  conquista.desbloqueada 
                    ? 'bg-green-50 text-green-800 border-green-100' 
                    : 'bg-gray-50 text-gray-600 border-gray-100'
                }`}>
                  {conquista.desbloqueada ? (
                    <div className="flex justify-between items-center">
                      <span>Desbloqueada em</span>
                      <span className="font-medium">{conquista.data}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span>Bloqueada</span>
                      <span className="font-medium">Continue participando</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}