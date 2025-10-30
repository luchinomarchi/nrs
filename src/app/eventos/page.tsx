'use client';

import { useState } from 'react';
import Link from 'next/link';

// Dados simulados para o calendário de eventos
const mockEvents = [
  { 
    id: 1, 
    nome: 'Distribuição de Alimentos', 
    data: '2023-06-15', 
    horario: '09:00 - 12:00', 
    local: 'Centro Comunitário',
    endereco: 'Rua das Flores, 123 - Centro',
    descricao: 'Distribuição de cestas básicas para famílias cadastradas no programa.',
    vagasTotal: 20,
    vagasPreenchidas: 15,
    equipes: ['Logística', 'Atendimento'],
    inscrito: true
  },
  { 
    id: 2, 
    nome: 'Arrecadação de Agasalhos', 
    data: '2023-06-22', 
    horario: '14:00 - 17:00', 
    local: 'Praça Central',
    endereco: 'Praça da Liberdade - Centro',
    descricao: 'Campanha de arrecadação de agasalhos para o inverno solidário.',
    vagasTotal: 15,
    vagasPreenchidas: 8,
    equipes: ['Logística', 'Divulgação'],
    inscrito: false
  },
  { 
    id: 3, 
    nome: 'Atendimento Médico', 
    data: '2023-06-30', 
    horario: '08:00 - 16:00', 
    local: 'Escola Municipal',
    endereco: 'Av. Principal, 500 - Bairro Novo',
    descricao: 'Atendimento médico gratuito para comunidades carentes.',
    vagasTotal: 30,
    vagasPreenchidas: 12,
    equipes: ['Saúde', 'Atendimento', 'Logística'],
    inscrito: false
  }
];

export default function EventosPage() {
  const [selectedMonth, setSelectedMonth] = useState('Junho 2023');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [filterEquipe, setFilterEquipe] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtra eventos com base nos critérios
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.local.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEquipe = filterEquipe === 'Todas' || event.equipes.includes(filterEquipe);
    return matchesSearch && matchesEquipe;
  });

  // Abre o modal de detalhes do evento
  const openEventDetails = (event: any) => {
    setSelectedEvent(event);
  };

  // Fecha o modal de detalhes do evento
  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  // Simula a inscrição em um evento
  const handleInscricao = (eventId: number) => {
    alert(`Inscrição realizada com sucesso para o evento #${eventId}!`);
    closeEventDetails();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center text-white mr-3">
              NR
            </div>
            <span className="text-xl font-bold">Núcleo de Responsabilidade</span>
          </Link>
          <nav className="flex space-x-6">
            <Link href="/voluntario/dashboard" className="text-gray-600 hover:text-teal-700">
              Dashboard
            </Link>
            <Link href="/checkin" className="text-gray-600 hover:text-teal-700">
              Check-in
            </Link>
            <Link href="/eventos" className="text-teal-700 font-medium">
              Eventos
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Filtrar Eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar por nome ou local
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Digite para buscar..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por equipe
              </label>
              <select
                value={filterEquipe}
                onChange={(e) => setFilterEquipe(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="Todas">Todas as equipes</option>
                <option value="Logística">Logística</option>
                <option value="Atendimento">Atendimento</option>
                <option value="Saúde">Saúde</option>
                <option value="Divulgação">Divulgação</option>
                <option value="Educação">Educação</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Eventos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{event.nome}</h3>
                <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                  {event.equipes[0]}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p><strong>Data:</strong> {new Date(event.data).toLocaleDateString('pt-BR')}</p>
                <p><strong>Horário:</strong> {event.horario}</p>
                <p><strong>Local:</strong> {event.local}</p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Vagas preenchidas</span>
                  <span>{event.vagasPreenchidas}/{event.vagasTotal}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-teal-700 h-2 rounded-full" 
                    style={{ width: `${(event.vagasPreenchidas / event.vagasTotal) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => openEventDetails(event)}
                className="w-full bg-teal-700 text-white py-2 px-4 rounded hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Detalhes do Evento */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.nome}</h2>
                <button
                  onClick={closeEventDetails}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Informações do Evento</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Data:</strong> {new Date(selectedEvent.data).toLocaleDateString('pt-BR')}</p>
                      <p><strong>Horário:</strong> {selectedEvent.horario}</p>
                    </div>
                    <div>
                      <p><strong>Local:</strong> {selectedEvent.local}</p>
                      <p><strong>Endereço:</strong> {selectedEvent.endereco}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Descrição</h3>
                  <p className="text-gray-600">{selectedEvent.descricao}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Equipes Envolvidas</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.equipes.map((equipe: string, index: number) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {equipe}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Vagas</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Preenchidas</span>
                    <span>{selectedEvent.vagasPreenchidas}/{selectedEvent.vagasTotal}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-teal-700 h-2 rounded-full" 
                      style={{ width: `${(selectedEvent.vagasPreenchidas / selectedEvent.vagasTotal) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeEventDetails}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Fechar
                </button>
                {selectedEvent.inscrito ? (
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
                  >
                    Já Inscrito
                  </button>
                ) : (
                  <button
                    onClick={() => handleInscricao(selectedEvent.id)}
                    className="px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Inscrever-se
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}