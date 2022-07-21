import getConfig from 'next/config'
import useSWR from 'swr'
import { fetchWithToken } from '../lib/fetcher'

export const useApplication = (token, applicationId) => {
  const { publicRuntimeConfig } = getConfig()

  const { data: application, error } = useSWR(
    () =>
      token &&
      applicationId && [
        `${publicRuntimeConfig.api_url}/applications/${applicationId}`,
        token,
      ],
    fetchWithToken
  )

  if (error) return { error }
  if (!application) return { isLoading: true }

  return { application }
}
