/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeholder.com', 'via.placeholder.com', 'placehold.co'],
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  // Remove redirects since they don't work with static export
  // async redirects() {
  //   return [
  //     {
  //       source: '/other-stories',
  //       destination: '/swahabi-stories',
  //       permanent: true,
  //     },
  //     {
  //       source: '/other-stories/:id',
  //       destination: '/swahabi-stories/:id',
  //       permanent: true,
  //     },
  //   ]
  // },
}

module.exports = nextConfig 