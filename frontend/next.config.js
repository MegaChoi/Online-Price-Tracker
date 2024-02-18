/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ['mongoose']
    },
    images: {
      domains: [
        'm.media-amazon.com','shop.coles.com.au']
    }
  }
  
  module.exports = nextConfig