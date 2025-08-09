/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Temporarily disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Optional: also ignore TypeScript errors during builds if needed
    // ignoreBuildErrors: true,
  },
}

module.exports = nextConfig