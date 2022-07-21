import getConfig from 'next/config'
import useSWR from 'swr'
import { fetchWithToken } from '../lib/fetcher'

export const useContract = (token, contractId) => {
  const { publicRuntimeConfig } = getConfig()

  const { data: contract, error } = useSWR(
    () =>
      token &&
      contractId && [
        `${publicRuntimeConfig.api_url}/contracts/${contractId}`,
        token,
      ],
    fetchWithToken
  )

  if (error) return { error }
  if (!contract) return { isLoading: true }

  return { contract }
}
