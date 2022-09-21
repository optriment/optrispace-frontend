import * as Sentry from '@sentry/nextjs'
import { BrowserTracing } from '@sentry/tracing'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
})
