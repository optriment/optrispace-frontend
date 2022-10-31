import getConfig from 'next/config'
import useSWR from 'swr'
import { errorHandler } from '../lib/errorHandler'
import { getWithToken } from '../lib/fetcher'

export const useContract = (token, contractId) => {
  const { publicRuntimeConfig } = getConfig()

  const { data, error } = useSWR(
    () =>
      token &&
      contractId && [
        `${publicRuntimeConfig.api_url}/contracts/${contractId}`,
        token,
      ],
    getWithToken
  )

  if (error) return { error: errorHandler(error) }

  if (!data) return { isLoading: true }

  return { contract: data }
}
