import getConfig from 'next/config'
import useSWR from 'swr'
import { errorHandler } from '../lib/errorHandler'
import { fetcher } from '../lib/fetcher'

export const useStats = () => {
  const { publicRuntimeConfig } = getConfig()

  const { data, error } = useSWR(
    `${publicRuntimeConfig.api_url}/stats`,
    fetcher
  )

  if (error) return { error: errorHandler(error) }

  if (!data) return { isLoading: true }

  return { stats: data }
}
