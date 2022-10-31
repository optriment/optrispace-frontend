import getConfig from 'next/config'
import useSWR from 'swr'
import { errorHandler } from '../lib/errorHandler'
import { getWithToken } from '../lib/fetcher'

export const useApplications = (token) => {
  const { publicRuntimeConfig } = getConfig()

  const { data, error } = useSWR(
    () => token && [`${publicRuntimeConfig.api_url}/applications`, token],
    getWithToken
  )

  if (error) return { error: errorHandler(error) }

  if (!data) return { isLoading: true }

  return { applications: data }
}
