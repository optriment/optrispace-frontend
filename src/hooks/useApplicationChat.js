import getConfig from 'next/config'
import useSWR from 'swr'
import { fetchWithToken } from '../lib/fetcher'

export const useApplicationChat = (token, applicationId) => {
  const { publicRuntimeConfig } = getConfig()

  const { data, error } = useSWR(
    () =>
      token &&
      applicationId && [
        `${publicRuntimeConfig.api_url}/applications/${applicationId}/chat`,
        token,
      ],
    fetchWithToken
  )

  if (error) return { error }

  return { chat: data }
}
