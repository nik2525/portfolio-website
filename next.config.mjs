/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export configuration
  output: 'export',
  
  // Base path for GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-website/' : '',
  
  // Ensure trailing slashes for GitHub Pages compatibility
  trailingSlash: true,
  
  // Image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Build output directory
  distDir: 'out',
  
  // Environment variables
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === 'production' ? '/portfolio-website' : '',
  },
  
  // Webpack configuration for path aliases
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Add any path aliases here
        '@': new URL('./', import.meta.url).pathname,
      };
    }
    return config;
  },
  
  // Optional: Enable React Strict Mode
  reactStrictMode: true,
  
  // Optional: Configure page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
};

export default nextConfig;
