import getConfig from 'next/config'
import { postWithToken, putWithToken } from './fetcher'

const { publicRuntimeConfig } = getConfig()

const convertToPositiveFloat = (value) => {
  return Math.abs(parseFloat(value)).toString()
}

export async function createJob(token, { title, description, budget }) {
  return await postWithToken(`${publicRuntimeConfig.api_url}/jobs`, token, {
    title: title.trim(),
    description: description.trim(),
    budget: convertToPositiveFloat(budget),
  })
}

export async function updateJob(token, jobId, { title, description, budget }) {
  return await putWithToken(
    `${publicRuntimeConfig.api_url}/jobs/${jobId}`,
    token,
    {
      title: title.trim(),
      description: description.trim(),
      budget: convertToPositiveFloat(budget),
    }
  )
}

export async function blockJob(token, jobId) {
  return await postWithToken(
    `${publicRuntimeConfig.api_url}/jobs/${jobId}/block`,
    token
  )
}

export async function createApplication(token, jobId, { comment, price }) {
  return await postWithToken(
    `${publicRuntimeConfig.api_url}/jobs/${jobId}/applications`,
    token,
    {
      comment: comment.trim(),
      price: convertToPositiveFloat(price),
    }
  )
}

export async function createContract(
  token,
  { applicationId, contractorId, customerAddress, title, description, price }
) {
  return await postWithToken(
    `${publicRuntimeConfig.api_url}/contracts`,
    token,
    {
      application_id: applicationId,
      performer_id: contractorId,
      customer_address: customerAddress,
      title: title.trim(),
      description: description.trim(),
      price: convertToPositiveFloat(price),
    }
  )
}

export async function acceptContract(token, contractId, contractorAddress) {
  return await postWithToken(
    `${publicRuntimeConfig.api_url}/contracts/${contractId}/accept`,
    token,
    {
      performer_address: contractorAddress,
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

export async function updateDisplayName(token, personId, displayName) {
  return await putWithToken(
    `${publicRuntimeConfig.api_url}/persons/${personId}`,
    token,
    {
      display_name: displayName.trim(),
    }
  )
}
