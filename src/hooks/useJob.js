import * as Sentry from '@sentry/nextjs'
import getConfig from 'next/config'
import useSWR from 'swr'
import { fetcher } from '../lib/fetcher'

export const useJob = (jobId) => {
  const { publicRuntimeConfig } = getConfig()

  const { data: job, error } = useSWR(
    () => jobId && `${publicRuntimeConfig.api_url}/jobs/${jobId}`,
    fetcher
  )

  if (error) {
    if (error.message.match(/failed to fetch/i)) {
      Sentry.captureMessage('Server is not available')
      return { error: 'Server is not available' }
    }

    if (error?.info?.message.match(/entity with specified id not found/i)) {
      return { error: 'Job does not exist' }
    }

    Sentry.captureException(error)
    return { error }
  }

  if (!job) return { isLoading: true }

  return { job }
}
