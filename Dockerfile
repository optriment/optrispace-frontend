# Install dependencies only when needed
FROM node:18.9.0-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# hadolint ignore=DL3018
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:18.9.0-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

ARG API_URL
ENV API_URL=$API_URL

ARG NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN

ENV SENTRY_IGNORE_API_RESOLUTION_ERROR 1

ARG DOMAIN
ENV DOMAIN=$DOMAIN

# Google Analytics
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID G-ER15B38CRP

# Binance Smart Chain Testnet:
ENV TOKEN_SYMBOL "BNB"

ARG BLOCKCHAIN_NETWORK_NAME
ENV BLOCKCHAIN_NETWORK_NAME=$BLOCKCHAIN_NETWORK_NAME

ARG CONTRACT_FACTORY_ADDRESS
ENV CONTRACT_FACTORY_ADDRESS=$CONTRACT_FACTORY_ADDRESS

ARG REQUIRED_CHAIN_ID
ENV REQUIRED_CHAIN_ID=$REQUIRED_CHAIN_ID

ARG BLOCKCHAIN_VIEW_ADDRESS_URL
ENV BLOCKCHAIN_VIEW_ADDRESS_URL=$BLOCKCHAIN_VIEW_ADDRESS_URL

RUN npm run build

# Production image, copy all the files and run next
FROM node:18.9.0-alpine AS runner
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
