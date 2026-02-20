/** @type {import('next').NextConfig} */

const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages';

const nextConfig = {
  ...(isGitHubPages && {
    output: 'export',
    basePath: '/GURPC',
  }),
  images: {
    unoptimized: true,
    domains: ['drive.google.com', 'googleusercontent.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
