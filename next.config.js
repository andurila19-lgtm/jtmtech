/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  experimental: {
    optimizePackageImports: [
      '@chakra-ui/react',
      '@chakra-ui/icons',
      '@chakra-ui/system',
      'react-icons/md',
      'react-icons/io',
      'react-icons/io5',
      'react-icons/fi',
      'react-icons/ri',
      'react-icons/fa',
      'react-icons/ai',
      'react-icons/bi',
      'framer-motion',
      '@tanstack/react-table',
    ],
  },
  images: {
    domains: [
      'images.unsplash.com',
      'i.ibb.co',
      'scontent.fotp8-1.fna.fbcdn.net',
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
