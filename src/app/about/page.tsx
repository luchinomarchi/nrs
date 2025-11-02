import Link from "next/link";

export default function AboutPage() {
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
            <Link href="/register" className="hover:underline">Cadastre-se</Link>
            <Link href="/login" className="btn-primary px-4 py-2">Entrar</Link>
          </nav>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="card-primary p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Sobre a Nossa Ronda Solidária</h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            A Nossa Ronda Solidária é uma iniciativa que conecta voluntários a ações
            sociais, com foco em acolhimento, distribuição de alimentos e apoio a pessoas em
            situação de vulnerabilidade. Nosso objetivo é facilitar a organização das rondas,
            garantir presença e registrar conquistas que fortalecem o engajamento da comunidade.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Com nossa plataforma, você pode se cadastrar como voluntário, participar de eventos,
            integrar equipes e acompanhar suas participações ao longo do tempo. Para administradores,
            há um painel completo para gestão de equipes, eventos, presença e envio de comunicados.
          </p>

          <div className="bg-primary-50 border border-primary-100 rounded-md p-4 mb-6">
            <h2 className="text-lg font-semibold text-primary-800 mb-2">Recursos principais</h2>
            <ul className="list-disc pl-6 text-primary-900">
              <li>Cadastro e login de voluntários com verificação</li>
              <li>Gestão de equipes e eventos</li>
              <li>Registro de presença e acompanhamento</li>
              <li>Conquistas e gamificação para incentivar participação</li>
            </ul>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <Link href="/register" className="btn-primary px-4 py-2">Cadastre-se</Link>
            <Link href="/login" className="btn-secondary px-4 py-2">Entrar</Link>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Este conteúdo é institucional e poderá ser atualizado conforme expansão das atividades.
          </p>
        </div>
      </main>
    </div>
  );
}