import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-100 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <div className="w-12 h-12 mr-3 rounded-full bg-teal-700 flex items-center justify-center text-white">
              NR
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Nossa Ronda Solidária</h1>
          </div>
          <div className="flex space-x-4">
            <Link href="/login" className="px-4 py-2 rounded-md bg-white text-teal-700 border border-teal-700 hover:bg-teal-50 transition">
              Entrar
            </Link>
            <Link href="/register" className="px-4 py-2 rounded-md bg-teal-700 text-white hover:bg-teal-800 transition">
              Cadastrar
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center mb-20">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Transforme vidas através do voluntariado
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Junte-se à Nossa Ronda Solidária e faça parte de uma comunidade dedicada a ajudar pessoas em situação de vulnerabilidade.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/register" className="px-6 py-3 rounded-md bg-teal-700 text-white text-center hover:bg-teal-800 transition">
                Seja um voluntário
              </Link>
              <Link href="/about" className="px-6 py-3 rounded-md bg-white text-teal-700 text-center border border-teal-700 hover:bg-teal-50 transition">
                Saiba mais
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md h-80 bg-teal-200 rounded-lg relative overflow-hidden">
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 flex items-center justify-center text-teal-700 text-lg">
                Imagem Ilustrativa
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Como funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Cadastre-se</h3>
              <p className="text-gray-600">
                Crie sua conta e preencha seu perfil para começar sua jornada como voluntário.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Participe de ações</h3>
              <p className="text-gray-600">
                Inscreva-se em ações solidárias e faça check-in no dia do evento.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Ganhe conquistas</h3>
              <p className="text-gray-600">
                Acumule pontos, desbloqueie conquistas e acompanhe seu impacto social.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-teal-700 text-white py-12 px-6 rounded-lg mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1.200+</div>
              <div className="text-teal-200">Voluntários ativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">350+</div>
              <div className="text-teal-200">Ações realizadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15.000+</div>
              <div className="text-teal-200">Pessoas impactadas</div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Depoimentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "Participar da Nossa Ronda Solidária mudou minha perspectiva sobre o voluntariado. É incrível ver como pequenas ações podem fazer grande diferença na vida das pessoas."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-teal-100 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold">Ana Silva</div>
                  <div className="text-sm text-gray-500">Voluntária há 2 anos</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "O sistema de gamificação torna a experiência ainda mais envolvente. Adoro desbloquear novas conquistas e ver meu progresso como voluntário."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-teal-100 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold">Carlos Oliveira</div>
                  <div className="text-sm text-gray-500">Voluntário há 1 ano</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Pronto para começar?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de voluntários que estão fazendo a diferença na vida de pessoas em situação de vulnerabilidade.
          </p>
          <Link href="/register" className="px-8 py-4 rounded-md bg-teal-700 text-white text-lg hover:bg-teal-800 transition inline-block">
            Cadastre-se agora
          </Link>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 mr-3 rounded-full bg-teal-700 flex items-center justify-center text-white text-sm">
                  NR
                </div>
                <h3 className="text-lg font-semibold">Nossa Ronda Solidária</h3>
              </div>
              <p className="text-gray-600">
                Transformando vidas através do voluntariado e da solidariedade.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/about" className="hover:text-teal-700">Sobre nós</Link></li>
                <li><Link href="/events" className="hover:text-teal-700">Eventos</Link></li>
                <li><Link href="/faq" className="hover:text-teal-700">Perguntas frequentes</Link></li>
                <li><Link href="/contact" className="hover:text-teal-700">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/blog" className="hover:text-teal-700">Blog</Link></li>
                <li><Link href="/testimonials" className="hover:text-teal-700">Depoimentos</Link></li>
                <li><Link href="/partners" className="hover:text-teal-700">Parceiros</Link></li>
                <li><Link href="/donate" className="hover:text-teal-700">Doações</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-600">
                <li>contato@nossaronda.org</li>
                <li>(11) 99999-9999</li>
                <li>São Paulo, SP</li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-teal-700">FB</a>
                <a href="#" className="text-gray-400 hover:text-teal-700">IG</a>
                <a href="#" className="text-gray-400 hover:text-teal-700">TW</a>
                <a href="#" className="text-gray-400 hover:text-teal-700">YT</a>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500 py-6 border-t border-gray-200">
            &copy; {new Date().getFullYear()} Nossa Ronda Solidária. Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </main>
  );
}