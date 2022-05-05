const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  poweredByHeader: false,

  // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  reactStrictMode: true,

  // https://nextjs.org/docs/api-reference/next.config.js/trailing-slash
  trailingSlash: true,

  experimental: {
    // This will build the project as a standalone app inside the Docker image
    outputStandalone: true,
  },

  // output source map for debugging
  productionBrowserSourceMaps: true,

  publicRuntimeConfig: {
    // Will be available on both server and client
    api_url: process.env.API_URL,
    token_contract_address: process.env.TOKEN_CONTRACT_ADDRESS,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
