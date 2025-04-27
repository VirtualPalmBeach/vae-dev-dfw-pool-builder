/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.CLOUDINARY_DOMAIN || 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  // The proper configuration for allowed dev origins
  // This might only be supported in newer Next.js versions
  experimental: {
    allowedDevOrigins: ['192.168.5.245']
  }
}

module.exports = nextConfig