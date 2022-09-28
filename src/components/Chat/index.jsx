import React, { useState, useEffect } from 'react'
import { Comment } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { ChatForm } from '../../forms/ChatForm'
import { useAuth } from '../../hooks'
import { getChat } from '../../lib/api'
import { formatDateTime } from '../../lib/formatDate'

const pollingInterval = 5000 // milliseconds

const buildMessage = (person, message) => {
  const isMyMessage = person?.id === message?.created_by
  const formattedCreatedAt = formatDateTime(message.created_at)
  return (
    <Comment key={message.id}>
      <Comment.Avatar src="/default-userpic.jpg" />

      <Comment.Content>
        <Comment.Author as="a">
          {isMyMessage ? 'Me' : message.author_name}
        </Comment.Author>

        <Comment.Metadata>
          <span>{formattedCreatedAt}</span>
        </Comment.Metadata>

        <Comment.Text>
          {message.text
            .trim()
            .split('\n')
            .map((str, idx) => {
              return (
                <div key={idx}>
                  {str}
                  <br />
                </div>
              )
            })}
        </Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

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
          return buildMessage(person, message)
        })}

        <ChatForm chatId={chatId} token={token} onPostMessage={update} />
      </Comment.Group>
    </>
  )
}
