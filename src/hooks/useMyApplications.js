import * as Sentry from '@sentry/nextjs'
import getConfig from 'next/config'
import useSWR from 'swr'
import { getWithToken } from '../lib/fetcher'

export const useMyApplications = (token) => {
  const { publicRuntimeConfig } = getConfig()

  const { data, error } = useSWR(
    () => token && [`${publicRuntimeConfig.api_url}/applications/my`, token],
    getWithToken
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
