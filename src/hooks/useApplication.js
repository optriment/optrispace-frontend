import getConfig from 'next/config'
import useSWR from 'swr'
import { errorHandler } from '../lib/errorHandler'
import { getWithToken } from '../lib/fetcher'

export const useApplication = (token, applicationId) => {
  const { publicRuntimeConfig } = getConfig()

  const { data, error } = useSWR(
    () =>
      token &&
      applicationId && [
        `${publicRuntimeConfig.api_url}/applications/${applicationId}`,
        token,
      ],
    getWithToken
  )

  if (error) return { error: errorHandler(error) }

  if (!data) return { isLoading: true }

  return { application: data }
}
