import getConfig from 'next/config'
import { postWithToken, putWithToken } from './fetcher'

const { publicRuntimeConfig } = getConfig()

export async function createJob(token, { title, description, budget }) {
  return await postWithToken(`${publicRuntimeConfig.api_url}/jobs`, token, {
    title,
    description,
    budget: budget.toString(),
  })
}

export async function updateJob(token, jobId, { title, description, budget }) {
  return await putWithToken(
    `${publicRuntimeConfig.api_url}/jobs/${jobId}`,
    token,
    {
      title,
      description,
      budget: budget.toString(),
    }
  )
}

export async function createApplication(token, jobId, { comment, price }) {
  return await postWithToken(
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
  { applicationId, performerId, customerAddress, title, description, price }
) {
  return await postWithToken(
    `${publicRuntimeConfig.api_url}/contracts`,
    token,
    {
      application_id: applicationId,
      performer_id: performerId,
      customer_address: customerAddress,
      title,
      description,
      price: price.toString(),
    }
  )
}

export async function acceptContract(token, contractId, performerAddress) {
  return await postWithToken(
    `${publicRuntimeConfig.api_url}/contracts/${contractId}/accept`,
    token,
    {
      performer_address: performerAddress,
    }
  )
}

export async function deployContract(token, contractId, contractAddress) {
  return await postWithToken(
    `${publicRuntimeConfig.api_url}/contracts/${contractId}/deploy`,
    token,
    {
      contract_address: contractAddress,
    }
  )
}

export async function sendContract(token, contractId) {
  return await postWithToken(
    `${publicRuntimeConfig.api_url}/contracts/${contractId}/send`,
    token
  )
}

export async function approveContract(token, contractId) {
  return await postWithToken(
    `${publicRuntimeConfig.api_url}/contracts/${contractId}/approve`,
    token
  )
}

export async function completeContract(token, contractId) {
  return await postWithToken(
    `${publicRuntimeConfig.api_url}/contracts/${contractId}/complete`,
    token
  )
}
