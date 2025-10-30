'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CheckinPage() {
  const [scanActive, setScanActive] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [checkInStatus, setCheckInStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [eventInfo, setEventInfo] = useState<any>(null);

  // Simula o escaneamento de um QR code
  const handleStartScan = () => {
    setScanActive(true);
    setScanResult(null);
    setCheckInStatus('idle');
    
    // Simula o tempo de escaneamento
    setTimeout(() => {
      // Código simulado que seria lido do QR
      const mockQrData = JSON.stringify({
        eventId: 'evt-123456',
        eventName: 'Distribuição de Alimentos',
        date: '15/06/2023',
        location: 'Centro Comunitário',
        volunteerId: 'vol-789012'
      });
      
      setScanResult(mockQrData);
      processCheckIn(mockQrData);
    }, 2000);
  };

  // Processa o check-in após o escaneamento
  const processCheckIn = (qrData: string) => {
    try {
      const data = JSON.parse(qrData);
      setEventInfo(data);
      
      // Simula uma verificação no servidor
      setTimeout(() => {
        // Simulação de sucesso (em produção, seria uma chamada à API)
        setCheckInStatus('success');
        setScanActive(false);
      }, 1500);
    } catch (error) {
      console.error('Erro ao processar QR code:', error);
      setCheckInStatus('error');
      setScanActive(false);
    }
  };

  // Reinicia o processo de check-in
  const handleReset = () => {
    setScanActive(false);
    setScanResult(null);
    setCheckInStatus('idle');
    setEventInfo(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center text-white mr-3">
              NR
            </div>
            <span className="text-xl font-semibold">Nossa Ronda Solidária</span>
          </Link>
          
          <nav className="flex space-x-4">
            <Link href="/voluntario/dashboard" className="text-gray-600 hover:text-teal-700">
              Dashboard
            </Link>
            <Link href="/checkin" className="text-teal-700 font-medium">
              Check-in
            </Link>
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Check-in de Voluntário</h1>
            
            {checkInStatus === 'idle' && !scanActive && !scanResult && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-5xl">
                    📷
                  </div>
                  <p className="mt-4 text-gray-600">
                    Escaneie o QR code do evento para realizar seu check-in
                  </p>
                </div>
                
                <button
                  onClick={handleStartScan}
                  className="w-full py-3 px-4 bg-teal-700 text-white rounded-lg hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Iniciar Escaneamento
                </button>
              </div>
            )}
            
            {scanActive && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-64 h-64 mx-auto bg-gray-800 rounded-lg relative overflow-hidden">
                    {/* Simulação visual do scanner */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-teal-500 rounded-lg"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-1 bg-teal-500 animate-pulse"></div>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600 animate-pulse">
                    Escaneando... Posicione o QR code na área indicada
                  </p>
                </div>
                
                <button
                  onClick={handleReset}
                  className="w-full py-3 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancelar
                </button>
              </div>
            )}
            
            {checkInStatus === 'success' && eventInfo && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center text-green-500 text-4xl">
                    ✓
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-green-600">
                    Check-in Realizado com Sucesso!
                  </h2>
                  
                  <div className="mt-6 bg-gray-50 rounded-lg p-4 text-left">
                    <h3 className="font-semibold text-lg">{eventInfo.eventName}</h3>
                    <div className="mt-2 space-y-1 text-gray-600">
                      <p>📅 Data: {eventInfo.date}</p>
                      <p>📍 Local: {eventInfo.location}</p>
                      <p>🆔 ID do Evento: {eventInfo.eventId}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-teal-50 rounded-lg text-teal-700 text-sm">
                    <p>Você ganhou <span className="font-bold">+20 pontos</span> por este check-in!</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Novo Check-in
                  </button>
                  <Link
                    href="/voluntario/dashboard"
                    className="flex-1 py-3 px-4 bg-teal-700 text-white rounded-lg hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center justify-center"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            )}
            
            {checkInStatus === 'error' && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center text-red-500 text-4xl">
                    ✕
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-red-600">
                    Erro no Check-in
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Não foi possível processar o check-in. O QR code pode ser inválido ou expirado.
                  </p>
                </div>
                
                <button
                  onClick={handleReset}
                  className="w-full py-3 px-4 bg-teal-700 text-white rounded-lg hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Tentar Novamente
                </button>
              </div>
            )}
          </div>
          
          {/* Footer com instruções */}
          <div className="bg-gray-50 px-8 py-4 border-t">
            <h3 className="font-medium text-gray-700 mb-2">Como fazer check-in:</h3>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Chegue ao local do evento</li>
              <li>Localize o coordenador com o QR code</li>
              <li>Escaneie o código usando este aplicativo</li>
              <li>Confirme sua presença e ganhe pontos</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}