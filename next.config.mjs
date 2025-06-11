/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

// For GitHub Pages
const repo = 'portfolio-website' // your repository name
const isProd = process.env.NODE_ENV === 'production'
const assetPrefix = isProd ? `/${repo}/` : ''
const basePath = isProd ? `/${repo}` : ''

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
  trailingSlash: true
}

export default nextConfig
