/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repo = 'portfolio-website';
const assetPrefix = isProd ? `/${repo}` : '';
const basePath = isProd ? `/${repo}` : '';

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
  assetPrefix: assetPrefix,
  trailingSlash: true,
  publicRuntimeConfig: {
    basePath: basePath,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // Fix for static export with images
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/[hash][ext][query]',
      },
    });
    return config;
  },
};

export default nextConfig;
