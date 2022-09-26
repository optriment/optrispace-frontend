export const fetcher = async (url) => {
  const headers = { 'Content-Type': 'application/json' }

  const payload = {
    method: 'GET',
    headers,
  }

  const res = await fetch(url, payload)

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data')

    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status

    throw error
  }

  return res.json()
}

// TODO: rename to getWithToken
export const fetchWithToken = async (url, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const payload = {
    method: 'GET',
    headers,
  }

  const res = await fetch(url, payload)

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data')

    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status

    throw error
  }

  return res.json()
}

export const postWithToken = async (url, token, body = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const payload = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }

  const res = await fetch(url, payload)

  if (!res.ok) {
    const error = new Error('An error occurred while sending the data')

    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status

    throw error
  }

  return res.json()
}

export const postWithoutToken = async (url, body = {}) => {
  const headers = {
    'Content-Type': 'application/json',
  }

  const payload = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }

  const res = await fetch(url, payload)

  if (!res.ok) {
    const error = new Error('An error occurred while sending the data')

    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status

    throw error
  }

  return res.json()
}

export const putWithToken = async (url, token, body = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const payload = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  }

  const res = await fetch(url, payload)

  if (!res.ok) {
    const error = new Error('An error occurred while sending the data')

    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status

    throw error
  }

  return res.json()
}
