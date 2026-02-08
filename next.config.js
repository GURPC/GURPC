/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Required for GitHub Pages (Static Site Generation)
  basePath: '/GURPC', // Required if your site is hosted at github.com/username/repo-name
  images: {
    unoptimized: true, // Required for static export (Next.js Image Optimization API doesn't work on static sites)
    domains: ['drive.google.com', 'googleusercontent.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
