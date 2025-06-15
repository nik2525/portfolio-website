/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports
  output: 'export',
  
  // Set the output directory to 'out' for compatibility with GitHub Pages
  distDir: 'out',
  
  // Enable static HTML export
  trailingSlash: true,
  
  // Base path for GitHub Pages
  basePath: isGithubActions ? '/portfolio-website' : '',
  
  // Asset prefix for GitHub Pages
  assetPrefix: isGithubActions ? '/portfolio-website/' : '',
  
  // Image optimization configuration (required for static export)
  images: {
    unoptimized: true,
  },
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Configure page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  
  // Optional: Add webpack configuration if needed
  webpack: (config) => {
    return config;
  },
}

export default nextConfig
