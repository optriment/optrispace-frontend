import React, { useState, useEffect } from 'react'
import { Comment } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { ChatForm } from '../../forms/ChatForm'
import { useAuth } from '../../hooks'
import { getChat } from '../../lib/api'
import { ChatMessage } from './ChatMessage'

const pollingInterval = 5000 // milliseconds

export const Chat = ({ chatId, token }) => {
  const { person } = useAuth()
  const [chat, setChat] = useState(null)
  const [error, setError] = useState('')

  const update = () => {
    setError('')

    getChat(token, chatId)
      .then((res) => setChat(res))
      .catch((err) => {
        setError(err?.info?.message || err.message)
      })
  }

  useEffect(() => {
    if (!chat) {
      update()
    }

    const timer = setTimeout(() => update(), pollingInterval)
    return () => clearTimeout(timer)
  }, [chat])

  return (
    <>
      {error !== '' && (
        <ErrorWrapper header="Unable to get chat updates" error={error} />
      )}

      <Comment.Group>
        {chat?.messages?.map((message) => {
          return (
            <ChatMessage key={message.id} person={person} message={message} />
          )
        })}

        <ChatForm chatId={chatId} token={token} onPostMessage={update} />
      </Comment.Group>
    </>
  )
}
