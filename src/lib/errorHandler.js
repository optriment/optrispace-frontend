import * as Sentry from '@sentry/nextjs'

const errorsMap = {
  'entity not found': 'Requested record does not exist',
  'user not authorized': 'Invalid credentials',
  'unable to login': 'Invalid credentials',
  'failed to fetch': 'Server is not available',
}

export const errorHandler = (error) => {
  const descriptiveError = error?.info?.message

  if (descriptiveError) {
    return errorsMap[descriptiveError] ?? descriptiveError
  }

  if (error.message.match(/failed to fetch/i)) {
    Sentry.captureMessage(errorsMap['failed to fetch'])
    return errorsMap['failed to fetch']
  }

  Sentry.captureException(error)
  return error.message
}
