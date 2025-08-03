const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'img.clerk.com'
        },
        {
            protocol: 'https',
            hostname: 'imgages.clerk.dev'
        }
    ]
  }
};

module.exports = withPWA(nextConfig); 