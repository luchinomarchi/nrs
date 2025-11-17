/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuração otimizada para Vercel
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'i.pravatar.cc', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'ui-avatars.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'api.dicebear.com', port: '', pathname: '/**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/forgot-password',
        destination: '/forgot',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
