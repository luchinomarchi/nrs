import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const hero = process.env.NEXT_PUBLIC_HERO_IMAGE_URL || '/hero.jpg'
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 sm:mb-12">
          <div className="flex items-center">
            <Image 
              src="/logo-nrs.png" 
              alt="Nossa Ronda Solidária" 
              width={200} 
              height={50}
              className="h-10 sm:h-12 w-auto"
            />
          </div>
          <div className="hidden md:flex space-x-3">
            <Link href="/login" className="px-4 py-2 rounded-md bg-white text-primary-700 border border-primary-700 hover:bg-primary-50 transition">
              Entrar
            </Link>
            <Link href="/register" className="btn-primary">
              Cadastrar
            </Link>
          </div>
        </header>

        <div className="md:hidden flex items-center justify-between mb-4">
          <Link href="/login" className="flex-1 mr-2 px-4 py-2 rounded-md bg-white text-primary-700 border border-primary-700 text-center">
            Entrar
          </Link>
          <Link href="/register" className="flex-1 ml-2 btn-primary text-center">
            Cadastrar
          </Link>
        </div>
        <div className="md:hidden text-right mb-8">
          <Link href="/forgot" className="text-sm text-primary-700 hover:text-primary-800">Esqueceu a senha?</Link>
        </div>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center mb-14 sm:mb-20">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Transforme vidas através do voluntariado
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Junte-se à Nossa Ronda Solidária e faça parte de uma comunidade dedicada a ajudar pessoas em situação de vulnerabilidade.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/register" className="btn-primary text-center px-6 py-3">
                Seja um voluntário
              </Link>
              <Link href="/about" className="px-6 py-3 rounded-md bg-white text-primary-700 text-center border border-primary-700 hover:bg-primary-50 transition">
                Saiba mais
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div
              className="w-full max-w-sm sm:max-w-md h-48 sm:h-80 rounded-lg relative overflow-hidden bg-center bg-cover"
              style={{ backgroundImage: `url(${hero})` }}
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">Como funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-primary p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 mb-4 font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand">Cadastre-se</h3>
              <p className="text-gray-600">
                Crie sua conta e preencha seu perfil para começar sua jornada como voluntário.
              </p>
            </div>
            <div className="card-primary p-6">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-700 mb-4 font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand">Participe de ações</h3>
              <p className="text-gray-600">
                Inscreva-se em ações solidárias e faça check-in no dia do evento.
              </p>
            </div>
            <div className="card-primary p-6">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center text-accent-700 mb-4 font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand">Ganhe conquistas</h3>
              <p className="text-gray-600">
                Acumule pontos, desbloqueie conquistas e acompanhe seu impacto social.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="header-gradient text-white py-8 sm:py-12 px-4 sm:px-6 rounded-lg mb-14 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">1.200+</div>
              <div className="text-primary-200">Voluntários ativos</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">350+</div>
              <div className="text-primary-200">Ações realizadas</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">15.000+</div>
              <div className="text-primary-200">Pessoas impactadas</div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">Depoimentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-primary p-6">
              <p className="text-gray-600 mb-4">
                "Participar da Nossa Ronda Solidária mudou minha perspectiva sobre o voluntariado. É incrível ver como pequenas ações podem fazer grande diferença na vida das pessoas."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold text-brand">Ana Silva</div>
                  <div className="text-sm text-gray-500">Voluntária há 2 anos</div>
                </div>
              </div>
            </div>
            <div className="card-primary p-6">
              <p className="text-gray-600 mb-4">
                "O sistema de gamificação torna a experiência ainda mais envolvente. Adoro desbloquear novas conquistas e ver meu progresso como voluntário."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-100 to-purple-100 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold text-brand">Carlos Oliveira</div>
                  <div className="text-sm text-gray-500">Voluntário há 1 ano</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Pronto para começar?</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de voluntários que estão fazendo a diferença na vida de pessoas em situação de vulnerabilidade.
          </p>
          <Link href="/register" className="btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg inline-block">
            Cadastre-se agora
          </Link>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-8 sm:pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center mb-4">
                <Image 
                  src="/logo-nrs.png" 
                  alt="Nossa Ronda Solidária" 
                  width={160} 
                  height={40}
                  className="h-8 w-auto mr-3"
                />
              </div>
              <p className="text-gray-600">
                Transformando vidas através do voluntariado e da solidariedade.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/about" className="hover:text-primary-700">Sobre nós</Link></li>
                <li><Link href="/events" className="hover:text-primary-700">Eventos</Link></li>
                <li><Link href="/faq" className="hover:text-primary-700">Perguntas frequentes</Link></li>
                <li><Link href="/contact" className="hover:text-primary-700">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/blog" className="hover:text-primary-700">Blog</Link></li>
                <li><Link href="/testimonials" className="hover:text-primary-700">Depoimentos</Link></li>
                <li><Link href="/partners" className="hover:text-primary-700">Parceiros</Link></li>
                <li><Link href="/donate" className="hover:text-primary-700">Doações</Link></li>
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
                <a href="#" className="text-gray-400 hover:text-primary-700">FB</a>
                <a href="#" className="text-gray-400 hover:text-primary-700">IG</a>
                <a href="#" className="text-gray-400 hover:text-primary-700">TW</a>
                <a href="#" className="text-gray-400 hover:text-primary-700">YT</a>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500 py-4 sm:py-6 border-t border-gray-200">
            &copy; {new Date().getFullYear()} Nossa Ronda Solidária. Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </main>
  );
}
