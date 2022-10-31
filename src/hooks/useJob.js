import getConfig from 'next/config'
import useSWR from 'swr'
import { errorHandler } from '../lib/errorHandler'
import { fetcher } from '../lib/fetcher'

export const useJob = (jobId) => {
  const { publicRuntimeConfig } = getConfig()

  const { data, error } = useSWR(
    () => jobId && `${publicRuntimeConfig.api_url}/jobs/${jobId}`,
    fetcher
  )

  if (error) return { error: errorHandler(error) }

  if (!data) return { isLoading: true }

  return { job: data }
}
