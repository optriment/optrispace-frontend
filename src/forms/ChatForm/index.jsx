import * as Sentry from '@sentry/nextjs'
import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { postChatMessage } from '../../lib/api'
import { isEmptyString } from '../../lib/validators'

export const ChatForm = ({ chatId, token, onPostMessage }) => {
  const [messageText, setMessageText] = useState('')
  const [error, setError] = useState('')

  const changeMessageText = (e) => {
    setMessageText(e.target.value)
  }

  const handlePostMessage = (e) => {
    setError('')

    e.preventDefault()

    try {
      postChatMessage(token, chatId, messageText)
        .then((result) => {
          if (!result.id) {
            setError(result.message)
          }
          onPostMessage && onPostMessage()
          setMessageText('')
        })
        .catch((err) => {
          console.error({ err })

          if (err.message.match(/failed to fetch/i)) {
            Sentry.captureMessage('Server is not available')
            setError('Server is not available')
          } else {
            setError(err?.info?.message || err.message)
          }
        })
    } catch (err) {
      console.error({ err })

      Sentry.captureException(err)
      setError(err.message)
    }
  }

  return (
    <>
      {error !== '' && (
        <ErrorWrapper header="Error while posting message" error={error} />
      )}

      <Form reply onSubmit={handlePostMessage}>
        <Form.TextArea
          id="comment"
          value={messageText}
          onChange={changeMessageText}
          readOnly={false}
        />

        <Button content="Send" primary disabled={isEmptyString(messageText)} />
      </Form>
    </>
  )
}
