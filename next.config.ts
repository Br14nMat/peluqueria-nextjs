import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BACKEND_URL: 'https://peluqueria-nest.onrender.com',
  },
  images: {
    domains: ['haircutday.com'],
  },
};

export default nextConfig;
