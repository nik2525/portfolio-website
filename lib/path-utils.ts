const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/portfolio-website' : '';

/**
 * Prepends the base path to a URL if it's a relative path
 * @param path The path to the asset or URL
 * @returns The complete URL with base path if needed
 */
export const asset = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('//') || path.startsWith('data:')) {
    return path;
  }
  return `${basePath}${path.startsWith('/') ? '' : '/'}${path}`;
};

/**
 * Creates a URL with the correct base path
 * @param path The path to append to the base URL
 * @returns The complete URL with base path
 */
export const url = (path: string = ''): string => {
  if (typeof window === 'undefined') {
    // Server-side: use environment variables
    const protocol = isProd ? 'https:' : 'http:';
    const host = isProd ? 'nik2525.github.io' : 'localhost:3000';
    return `${protocol}//${host}${basePath}${path.startsWith('/') ? '' : '/'}${path}`;
  }
  // Client-side: use current location
  return `${window.location.origin}${basePath}${path.startsWith('/') ? '' : '/'}${path}`;
};

export default {
  asset,
  url,
  basePath,
  isProd,
};
