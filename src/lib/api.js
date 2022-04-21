import getConfig from 'next/config'
import { postWithToken } from './fetcher';

const { publicRuntimeConfig } = getConfig()

export async function createJob(token, { title, description, duration, budget }) {
  return await postWithToken(`${publicRuntimeConfig.api_url}/jobs`, token, {
    title,
    description,
    duration: parseInt(duration),
    budget: budget.toString(),
  });
}

export async function createApplication(token, job_id, { comment, price }) {
  return await postWithToken(`${publicRuntimeConfig.api_url}/jobs/${job_id}/applications`, token, {
    comment,
    price,
  });
}

export async function createContract(token, { application_id, performer_id, title, description, duration, price }) {
  return await postWithToken(`${publicRuntimeConfig.api_url}/contracts`, token, {
    application_id,
    performer_id,
    title,
    description,
    duration: parseInt(duration),
    price: price.toString(),
  });
}
