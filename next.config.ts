import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  env: {
    BACKEND_URL: 'https://peluqueria-nest.onrender.com',
    //BACKEND_URL: 'http://localhost:3000'
  },
  images: {
    domains: ['haircutday.com'],
  },
}

export default nextConfig;
