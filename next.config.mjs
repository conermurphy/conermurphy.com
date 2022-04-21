/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    // eslint-disable-next-line
    config.resolve.fallback = { fs: false, path: false, process: false, buffer: false };

    // eslint-disable-next-line
    return config;
  },
};

export default nextConfig;
