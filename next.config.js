const { withSentryConfig } = require('@sentry/nextjs')

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
    token_symbol: process.env.TOKEN_SYMBOL,
    token_decimals: process.env.TOKEN_DECIMALS,
    contract_factory_address: process.env.CONTRACT_FACTORY_ADDRESS,
    blockchain_network_name: process.env.BLOCKCHAIN_NETWORK_NAME,
    blockchain_view_address_url: process.env.BLOCKCHAIN_VIEW_ADDRESS_URL,
    required_chain_id: process.env.REQUIRED_CHAIN_ID,
    domain: process.env.DOMAIN,
  },

  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(withBundleAnalyzer(nextConfig))
