// This is a custom image loader for Next.js that works with GitHub Pages
// It ensures images are loaded from the correct base path in production

const isProd = process.env.NODE_ENV === 'production';
const repo = 'portfolio-website';
const basePath = isProd ? `/${repo}` : '';

module.exports = function customLoader({ src, width, quality }) {
  // If it's an external URL, return it as is
  if (src.startsWith('http') || src.startsWith('https') || src.startsWith('data:')) {
    return src;
  }

  // Remove any leading slashes to prevent double slashes
  let cleanSrc = src.startsWith('/') ? src.substring(1) : src;
  
  // For local images, prepend the base path in production
  if (isProd) {
    // If the path already includes the base path, don't add it again
    if (!cleanSrc.startsWith(repo)) {
      cleanSrc = `${basePath}/${cleanSrc}`.replace(/\/+/g, '/');
    }
    return cleanSrc;
  }
  
  return `/${cleanSrc}`.replace(/\/+/g, '/');
};
