/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['drive.google.com', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  output: 'standalone',
};

module.exports = nextConfig;
