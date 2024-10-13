// next.config.mjs (ES module format)

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['drive.google.com', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    },
    output: 'standalone', // If you need standalone output for Vercel
  };
  
  export default nextConfig;
  