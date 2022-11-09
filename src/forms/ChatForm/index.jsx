import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { postChatMessage } from '../../lib/api'
import { errorHandler } from '../../lib/errorHandler'
import { isEmptyString } from '../../lib/validators'

export const ChatForm = ({ chatId, token, onPostMessage }) => {
  const [messageText, setMessageText] = useState('')
  const [error, setError] = useState('')

  const keyDownHandler = (e) => {
    if (!isEmptyString(messageText)) {
      if (
        (e.key === 'Enter' && !e.shiftKey) ||
        (e.key === 'Enter' && e.ctrlKey)
      )
        handlePostMessage(e)
    }
  }

  const handlePostMessage = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await postChatMessage(token, chatId, messageText)

      onPostMessage && onPostMessage()

      setMessageText('')
    } catch (err) {
      console.error({ err })

      setError(errorHandler(err))
    }
  }

  return (
    <>
      {error !== '' && (
        <ErrorWrapper header="Error while sending message" error={error} />
      )}

      <Form reply onSubmit={handlePostMessage}>
        <Form.TextArea
          id="comment"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={keyDownHandler}
        />

        <Button content="Send" primary disabled={isEmptyString(messageText)} />
      </Form>
    </>
  )
}
