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
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  trailingSlash: true,
  // Disable image optimization for static export
  // and use the default loader which works with static exports
  images: {
    unoptimized: true,
  },
  // Ensure static assets are copied correctly
  experimental: {
    // This is now the correct way to set output file tracing root
    outputFileTracingRoot: undefined, // Let Next.js handle this automatically
  },
};

// For GitHub Pages, we need to set the base path for static assets
if (isProd) {
  nextConfig.images = {
    ...nextConfig.images,
    loader: 'custom',
    loaderFile: './image-loader.js',
  };
}

export default nextConfig;
