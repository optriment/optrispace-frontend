import * as Sentry from '@sentry/nextjs'
import getConfig from 'next/config'
import useSWR from 'swr'
import { getWithToken } from '../lib/fetcher'

export const useContract = (token, contractId) => {
  const { publicRuntimeConfig } = getConfig()

  const { data: contract, error } = useSWR(
    () =>
      token &&
      contractId && [
        `${publicRuntimeConfig.api_url}/contracts/${contractId}`,
        token,
      ],
    getWithToken
  )

  if (error) {
    if (error.message.match(/failed to fetch/i)) {
      Sentry.captureMessage('Server is not available')
      return { error: 'Server is not available' }
    }

    if (error?.info?.message.match(/entity not found/i)) {
      return { error: 'Contract does not exist' }
    }

    Sentry.captureException(error)
    return { error }
  }
  if (!contract) return { isLoading: true }

  return { contract }
}
