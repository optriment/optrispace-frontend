import React, { useState } from 'react'
import { Comment } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { ChatForm } from '../../forms/ChatForm'
import { useAuth } from '../../hooks'
import { useInterval } from '../../hooks/useInterval'
import { getChat } from '../../lib/api'
import { ChatMessage } from './ChatMessage'

const pollingInterval = 5000 // milliseconds

export const Chat = ({ chatId, token }) => {
  const { person } = useAuth()
  const [chatUpdates, setChatUpdates] = useState(null)
  const [error, setError] = useState('')

  useInterval(async () => {
    try {
      const chats = await getChat(token, chatId)
      setChatUpdates(chats)
    } catch (err) {
      setError(err?.info?.message || err.message)
    }
  }, pollingInterval)

  const update = () => {
    getChat(token, chatId)
      .then((res) => {
        setError('')
        setChatUpdates(res)
      })
      .catch((err) => {
        setError(err?.info?.message || err.message)
      })
  }

  const chatMessages = chatUpdates?.messages || []

  return (
    <>
      {error !== '' && (
        <ErrorWrapper header="Unable to get chat updates" error={error} />
      )}

      <Comment.Group>
        {chatMessages.map((message) => {
          return (
            <ChatMessage key={message.id} person={person} message={message} />
          )
        })}

        <ChatForm chatId={chatId} token={token} onPostMessage={update} />
      </Comment.Group>
    </>
  )
}
