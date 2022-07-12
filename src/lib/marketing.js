import { postWithoutToken } from './fetcher'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export async function sendMarketingForm(kind, fields) {
  return await postWithoutToken(
    `${publicRuntimeConfig.api_url}/notifications`,
    {
      kind,
      fields,
    }
  )
}
