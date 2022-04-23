import getConfig from 'next/config'
import { postWithToken } from './fetcher'

const { publicRuntimeConfig } = getConfig()

export async function createJob(
  token,
  { title, description, duration, budget }
) {
  return postWithToken(`${publicRuntimeConfig.api_url}/jobs`, token, {
    title,
    description,
    duration: parseInt(duration, 10),
    budget: budget.toString(),
  })
}

export async function createApplication(token, jobId, { comment, price }) {
  return postWithToken(
    `${publicRuntimeConfig.api_url}/jobs/${jobId}/applications`,
    token,
    {
      comment,
      price,
    }
  )
}

export async function createContract(
  token,
  { applicationId, performerId, title, description, duration, price }
) {
  return postWithToken(`${publicRuntimeConfig.api_url}/contracts`, token, {
    application_id: applicationId,
    performer_id: performerId,
    title,
    description,
    duration: parseInt(duration, 10),
    price: price.toString(),
  })
}
