import getConfig from 'next/config'
import useSWR from 'swr'
import { errorHandler } from '../lib/errorHandler'
import { getWithToken } from '../lib/fetcher'

export const useJobApplications = (token, jobId) => {
  const { publicRuntimeConfig } = getConfig()

  const { data, error } = useSWR(
    () =>
      token &&
      jobId && [
        `${publicRuntimeConfig.api_url}/jobs/${jobId}/applications`,
        token,
      ],
    getWithToken
  )

  if (error) return { error: errorHandler(error) }

  if (!data) return { isLoading: true }

  return { applications: data }
}
