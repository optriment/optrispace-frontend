import * as Sentry from '@sentry/nextjs'
import getConfig from 'next/config'
import useSWR from 'swr'
import { fetchWithToken } from '../lib/fetcher'

export const useApplication = (token, applicationId) => {
  const { publicRuntimeConfig } = getConfig()

  const { data: application, error } = useSWR(
    () =>
      token &&
      applicationId && [
        `${publicRuntimeConfig.api_url}/applications/${applicationId}`,
        token,
      ],
    fetchWithToken
  )

  if (error) {
    if (error.message.match(/failed to fetch/i)) {
      Sentry.captureMessage('Server is not available')
      return { error: 'Server is not available' }
    }

    if (error?.info?.message.match(/entity not found/i)) {
      return { error: 'Application does not exist' }
    }

    Sentry.captureException(error)
    return { error }
  }

  if (!application) return { isLoading: true }

  return { application }
}
