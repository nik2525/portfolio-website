// This is a custom image loader for Next.js that works with GitHub Pages
// It ensures images are loaded from the correct base path in production

module.exports = function customLoader({ src, width, quality }) {
  // If it's an external URL, return it as is
  if (src.startsWith('http') || src.startsWith('https') || src.startsWith('data:')) {
    return src;
  }

  // For local images, prepend the base path in production
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const prefix = basePath && !src.startsWith(basePath) ? basePath : '';
  
  // Remove any leading slashes to prevent double slashes
  const cleanSrc = src.startsWith('/') ? src.substring(1) : src;
  
  return `${prefix}/${cleanSrc}`;
};
