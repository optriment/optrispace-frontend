import getConfig from 'next/config'
import useSWR from 'swr'
import { fetchWithToken } from '../lib/fetcher'

export const useApplications = (token, jobId) => {
  const { publicRuntimeConfig } = getConfig()

  const { data, error } = useSWR(
    () =>
      token &&
      jobId && [
        `${publicRuntimeConfig.api_url}/jobs/${jobId}/applications`,
        token,
      ],
    fetchWithToken
  )

  if (error) return { error }
  if (!data) return { isLoading: true }

  return { applications: data }
}
