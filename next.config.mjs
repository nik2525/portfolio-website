/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

// Get the repository name from the environment variables or use an empty string for local development
const repo = process.env.GITHUB_REPOSITORY?.replace(/.*\//, '') || ''
const assetPrefix = repo ? `/${repo}/` : ''
const basePath = repo ? `/${repo}` : ''

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
  assetPrefix: assetPrefix,
  basePath: basePath,
  trailingSlash: true
}

export default nextConfig
