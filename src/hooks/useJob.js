import getConfig from 'next/config'
import useSWR from 'swr'
import { fetcher } from '../lib/fetcher'

export const useJob = (jobId) => {
  const { publicRuntimeConfig } = getConfig()

  const { data: job, error } = useSWR(
    () => jobId && `${publicRuntimeConfig.api_url}/jobs/${jobId}`,
    fetcher
  )

  if (error) return { error }
  if (!job) return { isLoading: true }

  return { job }
}
