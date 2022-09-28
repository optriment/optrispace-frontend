import getConfig from 'next/config'
import { fetchWithToken, postWithToken, putWithToken } from './fetcher'

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

export async function acceptContract(token, contractId) {
  return await postWithToken(
    `${publicRuntimeConfig.api_url}/contracts/${contractId}/accept`,
    token
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

export async function signContract(token, contractId) {
  return await postWithToken(
    `${publicRuntimeConfig.api_url}/contracts/${contractId}/sign`,
    token
  )
}

export async function fundContract(token, contractId) {
  return await postWithToken(
    `${publicRuntimeConfig.api_url}/contracts/${contractId}/fund`,
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

export async function postChatMessage(token, chatId, messageText) {
  return await postWithToken(
    `${publicRuntimeConfig.api_url}/chats/${chatId}/messages`,
    token,
    {
      text: messageText.trim(),
    }
  )
}

export async function getChat(token, chatId) {
  return await fetchWithToken(
    `${publicRuntimeConfig.api_url}/chats/${chatId}`,
    token
  )
}
