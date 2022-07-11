# Install dependencies only when needed
FROM node:18.5.0-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# hadolint ignore=DL3018
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:18.5.0-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV API_URL /api

ENV SENTRY_DSN https://1ef304167a7647c284fc398934eb9946@o1253427.ingest.sentry.io/6509397
ENV SENTRY_IGNORE_API_RESOLUTION_ERROR 1

# Google Analytics
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID G-ER15B38CRP

# Binance Smart Chain Testnet:
ENV TOKEN_ADDRESS 0x745dCa60d216736366A367959e92455FA26a40A5
ENV CONTRACT_FACTORY_ADDRESS 0x2d81444FDc06847CD883877768Aee38Ac134ecFC
ENV REQUIRED_CHAIN_ID 0x61
ENV BLOCKCHAIN_NETWORK_NAME "Binance Smart Chain – Testnet"
ENV BLOCKCHAIN_VIEW_ADDRESS_URL https://testnet.bscscan.com/address

# Polygon Mumbai Testnet:
# ENV TOKEN_ADDRESS 0xCA20F1Eb17946d6cb44944086ee2202Aa63D38Ad
# ENV CONTRACT_FACTORY_ADDRESS 0xF2b5C60419A01ca2e0b6D41EbDD1C5E3C302F829
# ENV REQUIRED_CHAIN_ID 0x13881
# ENV BLOCKCHAIN_NETWORK_NAME "Mumbai – Testnet"

RUN npm run build

# Production image, copy all the files and run next
FROM node:18.5.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
