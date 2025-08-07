import type { NextConfig } from 'next';
import path from 'path';
import type webpack from 'webpack';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config: webpack.Configuration) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

export default nextConfig;
