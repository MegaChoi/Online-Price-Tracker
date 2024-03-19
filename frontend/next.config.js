/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ['mongoose']
    },
    images: {
      domains: [
        'm.media-amazon.com','shop.coles.com.au', 'www.jbhifi.com.au', 'cdn0.woolworths.media']
    }
  }
  
  module.exports = nextConfig