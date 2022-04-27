import getConfig from 'next/config'
import { postWithToken } from './fetcher'

const { publicRuntimeConfig } = getConfig()

export async function createJob(
  token,
  { title, description, duration, budget }
) {
  const response = await postWithToken(
    `${publicRuntimeConfig.api_url}/jobs`,
    token,
    {
      title,
      description,
      duration: parseInt(duration, 10),
      budget: budget.toString(),
    }
  )

  return await response.json()
}

export async function createApplication(token, jobId, { comment, price }) {
  const response = await postWithToken(
    `${publicRuntimeConfig.api_url}/jobs/${jobId}/applications`,
    token,
    {
      comment,
      price,
    }
  )

  return await response.json()
}

export async function createContract(
  token,
  { applicationId, performerId, title, description, duration, price }
) {
  const response = await postWithToken(
    `${publicRuntimeConfig.api_url}/contracts`,
    token,
    {
      application_id: applicationId,
      performer_id: performerId,
      title,
      description,
      duration: parseInt(duration, 10),
      price: price.toString(),
    }
  )

  return await response.json()
}

export async function acceptContract(token, contractId) {
  return postWithToken(
    `${publicRuntimeConfig.api_url}/contracts/${contractId}/accept`,
    token
  )
}

export async function sendContract(token, contractId) {
  return postWithToken(
    `${publicRuntimeConfig.api_url}/contracts/${contractId}/send`,
    token
  )
}

export async function approveContract(token, contractId) {
  return postWithToken(
    `${publicRuntimeConfig.api_url}/contracts/${contractId}/approve`,
    token
  )
}
