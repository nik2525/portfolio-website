import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const repo = 'portfolio-website';
const basePath = isProd ? `/${repo}` : '';

// For GitHub Pages
const assetPrefix = isProd ? `/${repo}/` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: assetPrefix,
  // Ensure static assets are properly referenced
  images: {
    unoptimized: true,
    path: assetPrefix,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure static export
  trailingSlash: true,
  // Fix for static assets in production
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // Fix for CSS and other static assets
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, './'),
      };
    }
    return config;
  },
  // Output directory for static export
  distDir: 'out',
  // Disable image optimization API for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
