const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },

  poweredByHeader: false,

  // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  reactStrictMode: true,

  experimental: {
    // This will build the project as a standalone app inside the Docker image
    outputStandalone: true,
  },

  publicRuntimeConfig: {
    // Will be available on both server and client
    api_url: process.env.API_URL,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
