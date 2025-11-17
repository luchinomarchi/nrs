'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChartBarIcon, UsersIcon, CalendarDaysIcon, CheckBadgeIcon, TrophyIcon, UserGroupIcon, EnvelopeIcon, Cog6ToothIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { getSession, signOut } from 'next-auth/react'

type Stats = { voluntariosAtivos: number; proximosEventos: number; checkinsRealizados: number; equipesAtivas: number };
type Vol = { id: string; nome: string; email: string; equipe: string; participacoes: number; pontos: number; status: string };
type TeamDist = { equipe: string; count: number };

export default function AdminDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [stats, setStats] = useState<Stats | null>(null);
  const [voluntarios, setVoluntarios] = useState<Vol[]>([]);
  const [teams, setTeams] = useState<TeamDist[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [eventos, setEventos] = useState<any[]>([]);
  const [novoEvento, setNovoEvento] = useState({ nome: '', descricao: '', data: '', inicio: '', fim: '', local: '', endereco: '', vagasTotal: 0 });
  const [equipes, setEquipes] = useState<any[]>([]);
  const [novaEquipe, setNovaEquipe] = useState({ nome: '', descricao: '' });
  const [checkResumo, setCheckResumo] = useState<any | null>(null);
  const [checkRegistros, setCheckRegistros] = useState<any[]>([]);
  const [conquistas, setConquistas] = useState<any[]>([]);
  const [novaConquista, setNovaConquista] = useState({ nome: '', descricao: '', categoria: '', icone: '', pontos: 0 });
  const [comAssunto, setComAssunto] = useState('');
  const [comMensagem, setComMensagem] = useState('');
  const [comAlvo, setComAlvo] = useState<'all' | 'team'>('all');
  const [comEquipe, setComEquipe] = useState<string>('');
  const [engajamento, setEngajamento] = useState<{ date: string; count: number }[]>([]);
  const [org, setOrg] = useState({ name: '', logoUrl: '', contactEmail: '', timezone: '', domain: '' });
  const [checkRules, setCheckRules] = useState({ toleranceMinutes: 10, pointsPerPresence: 10 });
  const [pointsRules, setPointsRules] = useState({ presence: 10, participation: 20 });
  const [envInfo, setEnvInfo] = useState<any>(null);
  const [branding, setBranding] = useState<any>({ accent: '', faviconUrl: '' })
  const [navVisibility, setNavVisibility] = useState<any>({ dashboard: true, voluntarios: true, eventos: true, checkins: true, conquistas: true, equipes: true, comunicacoes: true, perfil: true, configuracoes: true })
  const [eventsDefaults, setEventsDefaults] = useState<any>({ duration: 90, requireApproval: false })
  const [checkAdvanced, setCheckAdvanced] = useState<any>({ toleranceMinutes: 10, qrCodeRequired: false, geofenceRadiusM: 0 })
  const [commTemplates, setCommTemplates] = useState<any>({ eventReminder: { subject: '', body: '' } })
  const [notifyDefaults, setNotifyDefaults] = useState<any>({ email: true, push: false, digest: 'daily' })
  const [pointsLevelsText, setPointsLevelsText] = useState<string>('')
  const [exportText, setExportText] = useState<string>('')
  const [userName, setUserName] = useState<string>('Admin')
  const [userImage, setUserImage] = useState<string | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  const [userPhone, setUserPhone] = useState<string>('')
  const [userBio, setUserBio] = useState<string>('')
  const [userLocale, setUserLocale] = useState<string>('pt-BR')
  const [userTimezone, setUserTimezone] = useState<string>('')
  const [userTheme, setUserTheme] = useState<string>('light')
  const [notifyEmail, setNotifyEmail] = useState<boolean>(true)
  const [notifyPush, setNotifyPush] = useState<boolean>(false)
  const [marketingOptIn, setMarketingOptIn] = useState<boolean>(false)
  const [pwdCurrent, setPwdCurrent] = useState<string>('')
  const [pwdNew, setPwdNew] = useState<string>('')
  const [pwdConfirm, setPwdConfirm] = useState<string>('')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  function initialsFrom(n: string) {
    const s = (n || '').trim()
    if (!s) return 'A'
    const parts = s.split(' ')
    const first = parts[0]?.[0] || ''
    const last = parts.length > 1 ? parts[parts.length - 1][0] || '' : ''
    return (first + last).toUpperCase()
  }

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const [sRes, vRes, tRes] = await Promise.all([
          fetch('/api/admin/dashboard/stats'),
          fetch('/api/admin/dashboard/volunteers'),
          fetch('/api/admin/dashboard/teams-distribution'),
          
        ]);
        if (!mounted) return;
        if (!sRes.ok || !vRes.ok || !tRes.ok) {
          setErr('Falha ao carregar dados do dashboard');
          setLoading(false);
          return;
        }
        const sJson = await sRes.json();
        const vJson = await vRes.json();
        const tJson = await tRes.json();
        setStats(sJson.stats as Stats);
        setVoluntarios(vJson.voluntarios as Vol[]);
        setTeams(tJson.distribuicao as TeamDist[]);
        const sess = await getSession()
        const n = (sess?.user?.name as string) || (sess?.user?.email as string) || 'Admin'
        setUserName(n)
        setUserImage((sess?.user?.image as string) || null)
        setLoading(false);
      } catch {
        if (!mounted) return;
        setErr('Erro inesperado ao carregar dashboard');
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false };
  }, []);


  useEffect(() => {
    async function loadSection() {
      if (activeMenuItem === 'eventos') {
        const res = await fetch('/api/admin/events');
        if (res.ok) {
          const j = await res.json();
          setEventos(j.eventos || []);
        }
      } else if (activeMenuItem === 'equipes') {
        const res = await fetch('/api/admin/teams');
        if (res.ok) {
          const j = await res.json();
          setEquipes(j.equipes || []);
        }
      } else if (activeMenuItem === 'voluntarios') {
        const res = await fetch('/api/admin/dashboard/volunteers');
        if (res.ok) {
          const j = await res.json();
          setVoluntarios(j.voluntarios || []);
        }
      } else if (activeMenuItem === 'checkins') {
        const res = await fetch('/api/admin/checkins');
        if (res.ok) {
          const j = await res.json();
          setCheckResumo(j.resumo);
          setCheckRegistros(j.registros);
        }
      } else if (activeMenuItem === 'conquistas') {
        const res = await fetch('/api/admin/conquistas');
        if (res.ok) {
          const j = await res.json();
          setConquistas(j.conquistas || []);
        }
      } else if (activeMenuItem === 'dashboard') {
        const res = await fetch('/api/admin/dashboard/engagement');
        if (res.ok) {
          const j = await res.json();
          setEngajamento(j.series || []);
        }
      } else if (activeMenuItem === 'comunicacoes') {
        const res = await fetch('/api/admin/teams');
        if (res.ok) {
          const j = await res.json();
          setEquipes(j.equipes || []);
        }
      } else if (activeMenuItem === 'perfil') {
        const r = await fetch('/api/user/profile');
        if (r.ok) {
          const j = await r.json();
          const u = j.user || {};
          setUserName(u.name || userName);
          setUserImage(u.image || userImage);
          setUserEmail(u.email || '');
          setSelectedAvatar(u.image || '');
          setUserPhone(u.phone || '');
          setUserBio(u.bio || '');
          setUserLocale(u.locale || userLocale);
          setUserTimezone(u.timezone || '');
          setUserTheme(u.theme || userTheme);
          setNotifyEmail(!!u.notifyEmail);
          setNotifyPush(!!u.notifyPush);
          setMarketingOptIn(!!u.marketingOptIn);
        }
      } else if (activeMenuItem === 'configuracoes') {
        const [oRes, cRes, pRes, bRes, nRes, eDefRes, cAdvRes, ctRes] = await Promise.all([
          fetch('/api/admin/settings/org.profile'),
          fetch('/api/admin/settings/checkin.rules'),
          fetch('/api/admin/settings/points.rules'),
          fetch('/api/admin/settings/ui.branding'),
          fetch('/api/admin/settings/nav.visibility'),
          fetch('/api/admin/settings/events.defaults'),
          fetch('/api/admin/settings/checkin.advanced'),
          fetch('/api/admin/settings/comm.templates'),
        ]);
        if (oRes.ok) { const j = await oRes.json(); if (j.value) setOrg(j.value); }
        if (cRes.ok) { const j = await cRes.json(); if (j.value) setCheckRules(j.value); }
        if (pRes.ok) { const j = await pRes.json(); if (j.value) setPointsRules(j.value); }
        if (bRes.ok) { const j = await bRes.json(); if (j.value) setBranding(j.value); }
        if (nRes.ok) { const j = await nRes.json(); if (j.value) setNavVisibility(j.value); }
        if (eDefRes.ok) { const j = await eDefRes.json(); if (j.value) setEventsDefaults(j.value); }
        if (cAdvRes.ok) { const j = await cAdvRes.json(); if (j.value) setCheckAdvanced(j.value); }
        if (ctRes.ok) { const j = await ctRes.json(); if (j.value) setCommTemplates(j.value); }
      }
    }
    loadSection();
  }, [activeMenuItem]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 header-gradient text-white min-h-screen fixed hidden md:block">
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
              <ChartBarIcon className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'voluntarios' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('voluntarios')}
            >
              <UsersIcon className="w-5 h-5 mr-3" />
              <span>Voluntários</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'eventos' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('eventos')}
            >
              <CalendarDaysIcon className="w-5 h-5 mr-3" />
              <span>Eventos</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'checkins' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('checkins')}
            >
              <CheckBadgeIcon className="w-5 h-5 mr-3" />
              <span>Check-ins</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'conquistas' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('conquistas')}
            >
              <TrophyIcon className="w-5 h-5 mr-3" />
              <span>Conquistas</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'equipes' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('equipes')}
            >
              <UserGroupIcon className="w-5 h-5 mr-3" />
              <span>Equipes</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'comunicacoes' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('comunicacoes')}
            >
              <EnvelopeIcon className="w-5 h-5 mr-3" />
              <span>Comunicações</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'perfil' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('perfil')}
            >
              <UserGroupIcon className="w-5 h-5 mr-3" />
              <span>Perfil</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 ${activeMenuItem === 'configuracoes' ? 'bg-primary-600' : 'hover:bg-primary-500/20'}`}
              onClick={() => setActiveMenuItem('configuracoes')}
            >
              <Cog6ToothIcon className="w-5 h-5 mr-3" />
              <span>Configurações</span>
            </a>
        </nav>
        </div>
        
        {/* Main Content */}
        <div className="md:ml-64 flex-1 p-4 sm:p-8">
          <div className="md:hidden flex justify-between items-center mb-4">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border" onClick={() => setMobileNavOpen(true)}>
              <Bars3Icon className="w-5 h-5" />
              <span>Menu</span>
            </button>
            <Link href="/admin/dashboard" className="text-sm font-medium text-primary-700">Home</Link>
          </div>
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
              
              <div className="relative">
                <button onClick={() => setUserMenuOpen(v => !v)} className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-2 py-1">
                  {userImage ? (
                    <Image src={userImage} alt={userName} width={40} height={40} className="w-10 h-10 rounded-full mr-2 object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-2 flex items-center justify-center text-sm font-semibold text-gray-700">
                      {initialsFrom(userName)}
                    </div>
                  )}
                  <span className="text-sm font-medium">{userName}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => { setActiveMenuItem('perfil'); setUserMenuOpen(false) }}>
                      Perfil
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => { setActiveMenuItem('configuracoes'); setUserMenuOpen(false) }}>
                      Configurações
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => { signOut({ callbackUrl: '/' }) }}>
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {mobileNavOpen && (
            <div className="md:hidden fixed inset-0 z-30">
              <div className="absolute inset-0 bg-black/30" onClick={() => setMobileNavOpen(false)}></div>
              <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-lg">
                <div className="header-gradient text-white p-4 flex items-center justify-between">
                  <span className="font-semibold">Menu</span>
                  <button onClick={() => setMobileNavOpen(false)}><XMarkIcon className="w-6 h-6" /></button>
                </div>
                <nav className="p-2 space-y-1">
                  <button className={`w-full text-left px-4 py-3 ${activeMenuItem === 'dashboard' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`} onClick={() => { setActiveMenuItem('dashboard'); setMobileNavOpen(false) }}>
                    Dashboard
                  </button>
                  <button className={`w-full text-left px-4 py-3 ${activeMenuItem === 'voluntarios' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`} onClick={() => { setActiveMenuItem('voluntarios'); setMobileNavOpen(false) }}>
                    Voluntários
                  </button>
                  <button className={`w-full text-left px-4 py-3 ${activeMenuItem === 'eventos' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`} onClick={() => { setActiveMenuItem('eventos'); setMobileNavOpen(false) }}>
                    Eventos
                  </button>
                  <button className={`w-full text-left px-4 py-3 ${activeMenuItem === 'checkins' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`} onClick={() => { setActiveMenuItem('checkins'); setMobileNavOpen(false) }}>
                    Check-ins
                  </button>
                  <button className={`w-full text-left px-4 py-3 ${activeMenuItem === 'conquistas' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`} onClick={() => { setActiveMenuItem('conquistas'); setMobileNavOpen(false) }}>
                    Conquistas
                  </button>
                  <button className={`w-full text-left px-4 py-3 ${activeMenuItem === 'equipes' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`} onClick={() => { setActiveMenuItem('equipes'); setMobileNavOpen(false) }}>
                    Equipes
                  </button>
                  <button className={`w-full text-left px-4 py-3 ${activeMenuItem === 'comunicacoes' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`} onClick={() => { setActiveMenuItem('comunicacoes'); setMobileNavOpen(false) }}>
                    Comunicações
                  </button>
                  <button className={`w-full text-left px-4 py-3 ${activeMenuItem === 'perfil' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`} onClick={() => { setActiveMenuItem('perfil'); setMobileNavOpen(false) }}>
                    Perfil
                  </button>
                  <button className={`w-full text-left px-4 py-3 ${activeMenuItem === 'configuracoes' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`} onClick={() => { setActiveMenuItem('configuracoes'); setMobileNavOpen(false) }}>
                    Configurações
                  </button>
                </nav>
              </div>
            </div>
          )}
          {activeMenuItem === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="card-primary rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-gray-500 text-sm">Voluntários Ativos</h3>
                      <p className="text-2xl font-semibold">{stats?.voluntariosAtivos ?? '-'}</p>
                    </div>
                    <div className="p-2 rounded-full bg-primary-100 text-primary-700"><UsersIcon className="w-5 h-5" /></div>
                  </div>
                  <p className="text-green-500 text-sm">+12% desde o mês passado</p>
                </div>
                <div className="card-primary rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-gray-500 text-sm">Próximos Eventos</h3>
                      <p className="text-2xl font-semibold">{stats?.proximosEventos ?? '-'}</p>
                    </div>
                    <div className="p-2 rounded-full bg-secondary-100 text-secondary-700"><CalendarDaysIcon className="w-5 h-5" /></div>
                  </div>
                  <p className="text-green-500 text-sm">+2 novos eventos</p>
                </div>
                <div className="card-primary rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-gray-500 text-sm">Check-ins Realizados</h3>
                      <p className="text-2xl font-semibold">{stats?.checkinsRealizados ?? '-'}</p>
                    </div>
                    <div className="p-2 rounded-full bg-accent-100 text-accent-700"><CheckBadgeIcon className="w-5 h-5" /></div>
                  </div>
                  <p className="text-green-500 text-sm">+23% desde o último evento</p>
                </div>
                <div className="card-primary rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-gray-500 text-sm">Equipes Ativas</h3>
                      <p className="text-2xl font-semibold">{stats?.equipesAtivas ?? '-'}</p>
                    </div>
                    <div className="p-2 rounded-full bg-purple-100 text-purple-700"><UserGroupIcon className="w-5 h-5" /></div>
                  </div>
                  <p className="text-green-500 text-sm">+1 nova equipe</p>
                </div>
              </div>
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
                  <div className="h-64" style={{ minWidth: 0 }}>
                    <ResponsiveContainer width="100%" aspect={2}>
                      <LineChart data={engajamento} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
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
                  <div className="h-64" style={{ minWidth: 0 }}>
                    <ResponsiveContainer width="100%" aspect={1.8}>
                      <PieChart>
                        <Pie data={teams} dataKey="count" nameKey="equipe" cx="50%" cy="50%" outerRadius={80} label>
                          {teams.map((_, i) => (
                            <Cell key={`cell-${i}`} fill={["#2563eb","#10b981","#f59e0b","#ef4444","#8b5cf6","#14b8a6"][i % 6]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {activeMenuItem === 'voluntarios' && (
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
                  {voluntarios.map((voluntario) => (
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
          )}

        {activeMenuItem === 'eventos' && (
            <div className="mt-8 space-y-6">
              <div className="card-primary rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Eventos</h3>
                  <button className="btn-primary" onClick={async () => {
                    const body = { nome: novoEvento.nome, descricao: novoEvento.descricao, data: novoEvento.data, horarioInicio: novoEvento.inicio, horarioFim: novoEvento.fim, local: novoEvento.local, endereco: novoEvento.endereco, vagasTotal: Number(novoEvento.vagasTotal) };
                    const r = await fetch('/api/admin/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
                    if (r.ok) {
                      const j = await r.json();
                      setEventos((prev) => [...prev, j.evento]);
                      setNovoEvento({ nome: '', descricao: '', data: '', inicio: '', fim: '', local: '', endereco: '', vagasTotal: 0 });
                    }
                  }}>+ Adicionar</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <input className="border rounded px-3 py-2" placeholder="Nome" value={novoEvento.nome} onChange={(e) => setNovoEvento({ ...novoEvento, nome: e.target.value })} />
                  <input className="border rounded px-3 py-2" placeholder="Descrição" value={novoEvento.descricao} onChange={(e) => setNovoEvento({ ...novoEvento, descricao: e.target.value })} />
                  <input className="border rounded px-3 py-2" type="date" value={novoEvento.data} onChange={(e) => setNovoEvento({ ...novoEvento, data: e.target.value })} />
                  <input className="border rounded px-3 py-2" type="datetime-local" value={novoEvento.inicio} onChange={(e) => setNovoEvento({ ...novoEvento, inicio: e.target.value })} />
                  <input className="border rounded px-3 py-2" type="datetime-local" value={novoEvento.fim} onChange={(e) => setNovoEvento({ ...novoEvento, fim: e.target.value })} />
                  <input className="border rounded px-3 py-2" placeholder="Local" value={novoEvento.local} onChange={(e) => setNovoEvento({ ...novoEvento, local: e.target.value })} />
                  <input className="border rounded px-3 py-2" placeholder="Endereço" value={novoEvento.endereco} onChange={(e) => setNovoEvento({ ...novoEvento, endereco: e.target.value })} />
                  <input className="border rounded px-3 py-2" type="number" placeholder="Vagas" value={novoEvento.vagasTotal} onChange={(e) => setNovoEvento({ ...novoEvento, vagasTotal: e.target.value as any })} />
                </div>
              </div>

              <div className="card-primary rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center">
                  <h3 className="font-semibold">Lista de Eventos</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {eventos.map((ev) => (
                        <tr key={ev.id}>
                          <td className="px-6 py-4">{ev.nome}</td>
                          <td className="px-6 py-4">{new Date(ev.data).toLocaleDateString()}</td>
                          <td className="px-6 py-4">{ev.local}</td>
                          <td className="px-6 py-4">
                            <button className="px-3 py-1 border rounded mr-2" onClick={async () => {
                              await fetch(`/api/admin/events/${ev.id}`, { method: 'DELETE' });
                              setEventos((prev) => prev.filter((x) => x.id !== ev.id));
                            }}>Excluir</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        )}

        {activeMenuItem === 'equipes' && (
          <div className="mt-8 space-y-6">
            <div className="card-primary rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Equipes</h3>
                <button className="btn-primary" onClick={async () => {
                  const r = await fetch('/api/admin/teams', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(novaEquipe) });
                  if (r.ok) {
                    const j = await r.json();
                    setEquipes((prev) => [...prev, j.equipe]);
                    setNovaEquipe({ nome: '', descricao: '' });
                  }
                }}>+ Adicionar</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border rounded px-3 py-2" placeholder="Nome" value={novaEquipe.nome} onChange={(e) => setNovaEquipe({ ...novaEquipe, nome: e.target.value })} />
                <input className="border rounded px-3 py-2" placeholder="Descrição" value={novaEquipe.descricao} onChange={(e) => setNovaEquipe({ ...novaEquipe, descricao: e.target.value })} />
              </div>
            </div>

            <div className="card-primary rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="font-semibold">Lista de Equipes</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {equipes.map((eq) => (
                      <tr key={eq.id}>
                        <td className="px-6 py-4">{eq.nome}</td>
                        <td className="px-6 py-4">{eq.descricao || ''}</td>
                        <td className="px-6 py-4">
                          <button className="px-3 py-1 border rounded mr-2" onClick={async () => {
                            await fetch(`/api/admin/teams/${eq.id}`, { method: 'DELETE' });
                            setEquipes((prev) => prev.filter((x) => x.id !== eq.id));
                          }}>Excluir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeMenuItem === 'checkins' && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card-primary rounded-lg shadow p-6"><h3 className="text-sm text-gray-500">Total</h3><p className="text-2xl font-semibold">{checkResumo?.total ?? '-'}</p></div>
              <div className="card-primary rounded-lg shadow p-6"><h3 className="text-sm text-gray-500">Presentes</h3><p className="text-2xl font-semibold">{checkResumo?.presentes ?? '-'}</p></div>
              <div className="card-primary rounded-lg shadow p-6"><h3 className="text-sm text-gray-500">Ausentes</h3><p className="text-2xl font-semibold">{checkResumo?.ausentes ?? '-'}</p></div>
              <div className="card-primary rounded-lg shadow p-6"><h3 className="text-sm text-gray-500">Justificados</h3><p className="text-2xl font-semibold">{checkResumo?.justificados ?? '-'}</p></div>
            </div>
            <div className="card-primary rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b"><h3 className="font-semibold">Registros recentes</h3></div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voluntário</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pontos</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th></tr></thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {checkRegistros.map((r) => (
                      <tr key={r.id}><td className="px-6 py-4">{r.voluntario}</td><td className="px-6 py-4">{r.evento}</td><td className="px-6 py-4">{r.status}</td><td className="px-6 py-4">{r.pontos}</td><td className="px-6 py-4">{new Date(r.dataCheckin).toLocaleString()}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeMenuItem === 'conquistas' && (
          <div className="mt-8 space-y-6">
            <div className="card-primary rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Conquistas</h3>
                <button className="btn-primary" onClick={async () => {
                  const r = await fetch('/api/admin/conquistas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(novaConquista) });
                  if (r.ok) {
                    const j = await r.json();
                    setConquistas((prev) => [...prev, j.conquista]);
                    setNovaConquista({ nome: '', descricao: '', categoria: '', icone: '', pontos: 0 });
                  }
                }}>+ Adicionar</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input className="border rounded px-3 py-2" placeholder="Nome" value={novaConquista.nome} onChange={(e) => setNovaConquista({ ...novaConquista, nome: e.target.value })} />
                <input className="border rounded px-3 py-2" placeholder="Descrição" value={novaConquista.descricao} onChange={(e) => setNovaConquista({ ...novaConquista, descricao: e.target.value })} />
                <input className="border rounded px-3 py-2" placeholder="Categoria" value={novaConquista.categoria} onChange={(e) => setNovaConquista({ ...novaConquista, categoria: e.target.value })} />
                <input className="border rounded px-3 py-2" placeholder="Ícone" value={novaConquista.icone} onChange={(e) => setNovaConquista({ ...novaConquista, icone: e.target.value })} />
                <input className="border rounded px-3 py-2" type="number" placeholder="Pontos" value={novaConquista.pontos} onChange={(e) => setNovaConquista({ ...novaConquista, pontos: Number(e.target.value) })} />
              </div>
            </div>

            <div className="card-primary rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="font-semibold">Lista de Conquistas</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pontos</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {conquistas.map((c) => (
                      <tr key={c.id}>
                        <td className="px-6 py-4">{c.nome}</td>
                        <td className="px-6 py-4">{c.categoria}</td>
                        <td className="px-6 py-4">{c.pontos}</td>
                        <td className="px-6 py-4">
                          <button className="px-3 py-1 border rounded mr-2" onClick={async () => {
                            await fetch(`/api/admin/conquistas/${c.id}`, { method: 'DELETE' });
                            setConquistas((prev) => prev.filter((x) => x.id !== c.id));
                          }}>Excluir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeMenuItem === 'comunicacoes' && (
          <div className="mt-8 space-y-6">
            <div className="card-primary rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Enviar comunicação</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input className="border rounded px-3 py-2" placeholder="Assunto" value={comAssunto} onChange={(e) => setComAssunto(e.target.value)} />
                <select className="border rounded px-3 py-2" value={comAlvo} onChange={(e) => setComAlvo(e.target.value as any)}>
                  <option value="all">Todos voluntários</option>
                  <option value="team">Por equipe</option>
                </select>
                {comAlvo === 'team' && (
                  <select className="border rounded px-3 py-2" value={comEquipe} onChange={(e) => setComEquipe(e.target.value)}>
                    <option value="">Selecione a equipe</option>
                    {equipes.map((eq) => (
                      <option key={eq.id} value={eq.id}>{eq.nome}</option>
                    ))}
                  </select>
                )}
              </div>
              <textarea className="border rounded px-3 py-2 w-full h-40" placeholder="Mensagem" value={comMensagem} onChange={(e) => setComMensagem(e.target.value)} />
              <div className="mt-4">
                <button className="btn-primary" onClick={async () => {
                  const body = { alvo: comAlvo, equipeId: comAlvo === 'team' ? comEquipe : undefined, assunto: comAssunto, mensagem: comMensagem };
                  const r = await fetch('/api/admin/communications/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
                  if (r.ok) {
                    setComAssunto(''); setComMensagem(''); setComAlvo('all'); setComEquipe('');
                  }
                }}>Enviar</button>
              </div>
            </div>
          </div>
        )}

        {activeMenuItem === 'perfil' && (
          <div className="mt-8 space-y-6">
            <div className="card-primary rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Perfil</h3>
              <div className="flex items-center mb-4">
                {selectedAvatar ? (
                  <Image src={selectedAvatar} alt={userName} width={64} height={64} className="w-16 h-16 rounded-full mr-3 object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-base font-semibold text-gray-700">
                    {userName.split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase()}
                  </div>
                )}
                <div className="text-gray-700">
                  <div className="font-medium">{userName}</div>
                  <div className="text-sm">{userEmail}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-4">
                {[
                  `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(userName || 'nrs')}&backgroundColor=93c5fd`,
                  'https://api.dicebear.com/7.x/avataaars/png?seed=solidaria1&backgroundColor=86efac',
                  'https://api.dicebear.com/7.x/avataaars/png?seed=solidaria2&backgroundColor=fde68a',
                  'https://api.dicebear.com/7.x/micah/png?seed=solidaria3&backgroundColor=bfdbfe',
                  'https://api.dicebear.com/7.x/micah/png?seed=solidaria4&backgroundColor=fbcfe8',
                  'https://api.dicebear.com/7.x/bottts/png?seed=solidaria5&backgroundColor=bbf7d0',
                  'https://api.dicebear.com/7.x/bottts/png?seed=solidaria6&backgroundColor=fee2e2',
                  'https://api.dicebear.com/7.x/croodles-neutral/png?seed=solidaria7&backgroundColor=f5f5f5',
                  'https://api.dicebear.com/7.x/croodles-neutral/png?seed=solidaria8&backgroundColor=ede9fe',
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'NRS')}&background=random&size=160`,
                  '/avatars/brand-blue.svg',
                  '/avatars/brand-green.svg',
                  '/avatars/brand-orange.svg',
                  '/avatars/brand-purple.svg',
                ].map((src) => (
                  <button key={src} className={`rounded-lg overflow-hidden border ${selectedAvatar === src ? 'border-primary-500 ring-2 ring-primary-300' : 'border-gray-200'}`} onClick={() => setSelectedAvatar(src)}>
                    <Image src={src} alt="avatar" width={120} height={120} className="w-full h-24 object-cover" />
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mb-6">
                <input className="border rounded px-3 py-2 flex-1" placeholder="URL da imagem (https://...)" value={selectedAvatar} onChange={(e) => setSelectedAvatar(e.target.value)} />
                <button className="btn-primary" onClick={async () => {
                  const img = selectedAvatar.trim()
                  const r = await fetch('/api/user/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: img || null }) })
                  if (r.ok) {
                    setUserImage(img || null)
                  }
                }}>Salvar avatar</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input className="border rounded px-3 py-2" placeholder="Nome" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <input className="border rounded px-3 py-2" placeholder="Telefone" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
                <textarea className="border rounded px-3 py-2 md:col-span-2" placeholder="Bio" value={userBio} onChange={(e) => setUserBio(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <select className="border rounded px-3 py-2" value={userLocale} onChange={(e) => setUserLocale(e.target.value)}>
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                </select>
                <input className="border rounded px-3 py-2" placeholder="Timezone (ex.: America/Sao_Paulo)" value={userTimezone} onChange={(e) => setUserTimezone(e.target.value)} />
                <select className="border rounded px-3 py-2" value={userTheme} onChange={(e) => setUserTheme(e.target.value)}>
                  <option value="light">Tema claro</option>
                  <option value="dark">Tema escuro</option>
                  <option value="system">Sistema</option>
                </select>
              </div>
              <div className="flex items-center gap-6 mb-4">
                <label className="flex items-center gap-2"><input type="checkbox" checked={notifyEmail} onChange={(e) => setNotifyEmail(e.target.checked)} /> E-mails</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={notifyPush} onChange={(e) => setNotifyPush(e.target.checked)} /> Notificações push</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} /> Receber novidades</label>
              </div>
              <div className="flex gap-3">
                <button className="btn-primary" onClick={async () => {
                  const body = { name: userName }
                  const r = await fetch('/api/user/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
                  if (r.ok) {
                  }
                }}>Salvar perfil</button>
                <button className="px-4 py-2 border rounded" onClick={() => {}}>Cancelar</button>
              </div>
            </div>
            <div className="card-primary rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Segurança</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input className="border rounded px-3 py-2" type="password" placeholder="Senha atual" value={pwdCurrent} onChange={(e) => setPwdCurrent(e.target.value)} />
                <input className="border rounded px-3 py-2" type="password" placeholder="Nova senha" value={pwdNew} onChange={(e) => setPwdNew(e.target.value)} />
                <input className="border rounded px-3 py-2" type="password" placeholder="Confirmar senha" value={pwdConfirm} onChange={(e) => setPwdConfirm(e.target.value)} />
              </div>
              <div className="mt-4"><button className="btn-primary" onClick={async () => {
                if (pwdNew !== pwdConfirm || pwdNew.length < 8) return
                const r = await fetch('/api/user/password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ currentPassword: pwdCurrent, newPassword: pwdNew }) })
                if (r.ok) { setPwdCurrent(''); setPwdNew(''); setPwdConfirm('') }
              }}>Alterar senha</button></div>
            </div>
          </div>
        )}

        {activeMenuItem === 'configuracoes' && (
          <div className="mt-8 space-y-6">
            <div className="card-primary rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Organização</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border rounded px-3 py-2" placeholder="Nome" value={org.name} onChange={(e) => setOrg({ ...org, name: e.target.value })} />
                <input className="border rounded px-3 py-2" placeholder="Logo URL" value={org.logoUrl} onChange={(e) => setOrg({ ...org, logoUrl: e.target.value })} />
                <input className="border rounded px-3 py-2" placeholder="E-mail de contato" value={org.contactEmail} onChange={(e) => setOrg({ ...org, contactEmail: e.target.value })} />
                <input className="border rounded px-3 py-2" placeholder="Fuso horário" value={org.timezone} onChange={(e) => setOrg({ ...org, timezone: e.target.value })} />
                <input className="border rounded px-3 py-2" placeholder="Domínio" value={org.domain} onChange={(e) => setOrg({ ...org, domain: e.target.value })} />
              </div>
              <div className="mt-4"><button className="btn-primary" onClick={async () => {
                await fetch('/api/admin/settings/org.profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: org }) });
              }}>Salvar</button></div>
            </div>

            <div className="card-primary rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Check-ins</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border rounded px-3 py-2" type="number" placeholder="Tolerância (min)" value={checkRules.toleranceMinutes} onChange={(e) => setCheckRules({ ...checkRules, toleranceMinutes: Number(e.target.value) })} />
                <input className="border rounded px-3 py-2" type="number" placeholder="Pontos por presença" value={checkRules.pointsPerPresence} onChange={(e) => setCheckRules({ ...checkRules, pointsPerPresence: Number(e.target.value) })} />
              </div>
              <div className="mt-4"><button className="btn-primary" onClick={async () => {
                await fetch('/api/admin/settings/checkin.rules', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: checkRules }) });
              }}>Salvar</button></div>
            </div>

            <div className="card-primary rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Pontuação & Conquistas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border rounded px-3 py-2" type="number" placeholder="Pontos por presença" value={pointsRules.presence} onChange={(e) => setPointsRules({ ...pointsRules, presence: Number(e.target.value) })} />
                <input className="border rounded px-3 py-2" type="number" placeholder="Pontos por participação em evento" value={pointsRules.participation} onChange={(e) => setPointsRules({ ...pointsRules, participation: Number(e.target.value) })} />
              </div>
              <div className="mt-4"><button className="btn-primary" onClick={async () => {
                await fetch('/api/admin/settings/points.rules', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: pointsRules }) });
              }}>Salvar</button></div>
            </div>

            <div className="card-primary rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Branding</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border rounded px-3 py-2" placeholder="Cor de destaque (hex)" value={branding.accent || ''} onChange={(e) => setBranding({ ...branding, accent: e.target.value })} />
                <input className="border rounded px-3 py-2" placeholder="URL do favicon" value={branding.faviconUrl || ''} onChange={(e) => setBranding({ ...branding, faviconUrl: e.target.value })} />
              </div>
              <div className="mt-4"><button className="btn-primary" onClick={async () => {
                await fetch('/api/admin/settings/ui.branding', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: branding }) });
              }}>Salvar</button></div>
            </div>

            <div className="card-primary rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Navegação</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(navVisibility).map(([k, v]) => (
                  <label key={k} className="flex items-center gap-2"><input type="checkbox" checked={!!v} onChange={(e) => setNavVisibility({ ...navVisibility, [k]: e.target.checked })} /> {k}</label>
                ))}
              </div>
              <div className="mt-4"><button className="btn-primary" onClick={async () => {
                await fetch('/api/admin/settings/nav.visibility', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: navVisibility }) });
              }}>Salvar</button></div>
            </div>

            <div className="card-primary rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Eventos (padrões)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border rounded px-3 py-2" type="number" placeholder="Duração padrão (min)" value={eventsDefaults.duration || 0} onChange={(e) => setEventsDefaults({ ...eventsDefaults, duration: Number(e.target.value) })} />
                <label className="flex items-center gap-2"><input type="checkbox" checked={!!eventsDefaults.requireApproval} onChange={(e) => setEventsDefaults({ ...eventsDefaults, requireApproval: e.target.checked })} /> Aprovação para participação</label>
              </div>
              <div className="mt-4"><button className="btn-primary" onClick={async () => {
                await fetch('/api/admin/settings/events.defaults', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: eventsDefaults }) });
              }}>Salvar</button></div>
            </div>

            <div className="card-primary rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Check-ins (avançado)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input className="border rounded px-3 py-2" type="number" placeholder="Tolerância (min)" value={checkAdvanced.toleranceMinutes || 0} onChange={(e) => setCheckAdvanced({ ...checkAdvanced, toleranceMinutes: Number(e.target.value) })} />
                <label className="flex items-center gap-2"><input type="checkbox" checked={!!checkAdvanced.qrCodeRequired} onChange={(e) => setCheckAdvanced({ ...checkAdvanced, qrCodeRequired: e.target.checked })} /> QR Code obrigatório</label>
                <input className="border rounded px-3 py-2" type="number" placeholder="Geofence (m)" value={checkAdvanced.geofenceRadiusM || 0} onChange={(e) => setCheckAdvanced({ ...checkAdvanced, geofenceRadiusM: Number(e.target.value) })} />
              </div>
              <div className="mt-4"><button className="btn-primary" onClick={async () => {
                await fetch('/api/admin/settings/checkin.advanced', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: checkAdvanced }) });
              }}>Salvar</button></div>
            </div>

            <div className="card-primary rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Comunicações (templates)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border rounded px-3 py-2" placeholder="Assunto lembrete de evento" value={commTemplates.eventReminder?.subject || ''} onChange={(e) => setCommTemplates({ ...commTemplates, eventReminder: { ...(commTemplates.eventReminder||{}), subject: e.target.value } })} />
                <textarea className="border rounded px-3 py-2" placeholder="Corpo lembrete de evento" value={commTemplates.eventReminder?.body || ''} onChange={(e) => setCommTemplates({ ...commTemplates, eventReminder: { ...(commTemplates.eventReminder||{}), body: e.target.value } })} />
              </div>
              <div className="mt-4"><button className="btn-primary" onClick={async () => {
                await fetch('/api/admin/settings/comm.templates', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: commTemplates }) });
              }}>Salvar</button></div>
            </div>

            <div className="card-primary rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Notificações (padrões)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center gap-2"><input type="checkbox" checked={!!notifyDefaults.email} onChange={(e) => setNotifyDefaults({ ...notifyDefaults, email: e.target.checked })} /> E-mail</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={!!notifyDefaults.push} onChange={(e) => setNotifyDefaults({ ...notifyDefaults, push: e.target.checked })} /> Push</label>
                <select className="border rounded px-3 py-2" value={notifyDefaults.digest || 'daily'} onChange={(e) => setNotifyDefaults({ ...notifyDefaults, digest: e.target.value })}>
                  <option value="off">Sem resumo</option>
                  <option value="daily">Diário</option>
                  <option value="weekly">Semanal</option>
                </select>
              </div>
              <div className="mt-4"><button className="btn-primary" onClick={async () => {
                await fetch('/api/admin/settings/notify.defaults', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: notifyDefaults }) });
              }}>Salvar</button></div>
            </div>

            <div className="card-primary rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Pontuação & Níveis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border rounded px-3 py-2" type="number" placeholder="Presença" value={pointsRules.presence} onChange={(e) => setPointsRules({ ...pointsRules, presence: Number(e.target.value) })} />
                <input className="border rounded px-3 py-2" type="number" placeholder="Participação" value={pointsRules.participation} onChange={(e) => setPointsRules({ ...pointsRules, participation: Number(e.target.value) })} />
              </div>
              <div className="mt-4"><textarea className="border rounded px-3 py-2 w-full" rows={4} placeholder='Níveis (JSON) ex.: [{"nome":"Bronze","min":0},{"nome":"Prata","min":100}]' value={pointsLevelsText} onChange={(e) => setPointsLevelsText(e.target.value)} /></div>
              <div className="mt-4 flex gap-3">
                <button className="btn-primary" onClick={async () => {
                  let levels: any[] = []
                  try { levels = JSON.parse(pointsLevelsText || '[]') } catch {}
                  await fetch('/api/admin/settings/points.levels', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: levels }) });
                  await fetch('/api/admin/settings/points.rules', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: pointsRules }) });
                }}>Salvar</button>
                <button className="px-4 py-2 border rounded" onClick={() => setPointsLevelsText('')}>Limpar níveis</button>
              </div>
            </div>

            <div className="card-primary rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Exportar / Importar</h3>
              <div className="flex gap-3 mb-4">
                <button className="px-4 py-2 border rounded" onClick={async () => {
                  const r = await fetch('/api/admin/settings/all')
                  if (r.ok) { const j = await r.json(); setExportText(JSON.stringify(j.settings, null, 2)) }
                }}>Exportar</button>
                <button className="btn-primary" onClick={async () => {
                  try {
                    const arr = JSON.parse(exportText || '[]')
                    for (const s of arr) {
                      await fetch(`/api/admin/settings/${encodeURIComponent(s.key)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: s.value }) })
                    }
                  } catch {}
                }}>Importar</button>
              </div>
              <textarea className="border rounded px-3 py-2 w-full" rows={8} placeholder="Cole JSON de configurações aqui" value={exportText} onChange={(e) => setExportText(e.target.value)} />
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
