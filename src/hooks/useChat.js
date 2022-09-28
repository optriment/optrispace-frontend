import getConfig from 'next/config'
import useSWR from 'swr'
import { getWithToken } from '../lib/fetcher'

export const useChat = (token, chatId) => {
  const { publicRuntimeConfig } = getConfig()

  const { data, error } = useSWR(
    () =>
      token &&
      chatId && [`${publicRuntimeConfig.api_url}/chats/${chatId}`, token],
    getWithToken
  )

  if (error?.status === 404) {
    return { error: 'Chat not found' }
  } else if (error?.info?.message) {
    return { error: error?.info?.message }
  } else if (error?.message) {
    return { error: error?.message }
  }

  if (!data) return { isLoading: true }

  return { chat: data }
}
