import * as Sentry from '@sentry/nextjs'
import getConfig from 'next/config'
import useSWR from 'swr'
import { fetchWithToken } from '../lib/fetcher'

export const useApplications = (token, jobId) => {
  const { publicRuntimeConfig } = getConfig()

  const { data, error } = useSWR(
    () =>
      token &&
      jobId && [
        `${publicRuntimeConfig.api_url}/jobs/${jobId}/applications`,
        token,
      ],
    fetchWithToken
  )

  if (error) {
    if (error.message.match(/failed to fetch/i)) {
      Sentry.captureMessage('Server is not available')
      return { error: 'Server is not available' }
    }

    Sentry.captureException(error)
    return { error }
  }

  if (!data) return { isLoading: true }

  return { applications: data }
}
