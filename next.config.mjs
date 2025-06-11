/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repo = 'portfolio-website';
const basePath = isProd ? `/${repo}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Ensure static files are copied correctly
  output: 'export',
  distDir: 'out',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
