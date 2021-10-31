module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    IMAGES_DOMAIN: process.env.IMAGES_DOMAIN
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    IMAGES_DOMAIN: process.env.IMAGES_DOMAIN
  },
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16,32,48,64,96],
    domains: [process.env.IMAGES_DOMAIN],
    path: '/_next/image'
  },
}
