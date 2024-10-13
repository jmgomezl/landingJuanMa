/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    images: {
      domains: ['drive.google.com', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    },
  };
  
  export default nextConfig;
  
  