/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['placeholder.com', 'via.placeholder.com', 'placehold.co'],
    unoptimized: true,
  },
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/IslamicHistory' : '',
  // Optional: Set the assetPrefix if needed for production
  assetPrefix: process.env.NODE_ENV === 'production' ? '/IslamicHistory' : '',
  async redirects() {
    return [
      {
        source: '/other-stories',
        destination: '/swahabi-stories',
        permanent: true,
      },
      {
        source: '/other-stories/:id',
        destination: '/swahabi-stories/:id',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 