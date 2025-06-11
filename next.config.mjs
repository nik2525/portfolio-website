/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repo = 'portfolio-website';
const basePath = isProd ? `/${repo}` : '';
const assetPrefix = basePath ? `${basePath}/` : '';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    path: assetPrefix,
  },
  output: 'export',
  basePath: basePath,
  assetPrefix: assetPrefix,
  trailingSlash: true,
  // Ensure static assets are properly handled
  experimental: {
    outputFileTracingRoot: './',
  },
  // Copy the public folder to the out directory
  async exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      ...defaultPathMap,
    };
  },
};

// For GitHub Pages, we need to set the base path for static assets
if (isProd) {
  nextConfig.images = {
    ...nextConfig.images,
    loader: 'imgix',
    path: '',
  };
}

export default nextConfig;
