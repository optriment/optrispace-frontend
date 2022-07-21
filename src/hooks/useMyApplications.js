import getConfig from 'next/config'
import useSWR from 'swr'
import { fetchWithToken } from '../lib/fetcher'

export const useMyApplications = (token) => {
  const { publicRuntimeConfig } = getConfig()

  const { data, error } = useSWR(
    () => token && [`${publicRuntimeConfig.api_url}/applications/my`, token],
    fetchWithToken
  )

  if (error) return { error }
  if (!data) return { isLoading: true }

  return { applications: data }
}
