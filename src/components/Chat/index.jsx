import React, { useEffect } from 'react'
import { Comment, Header } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import JustOneSecond from '../../components/JustOneSecond'
import { ChatForm } from '../../forms/ChatForm'
import { useAuth } from '../../hooks'
import { getChat } from '../../lib/api'
import { formatDateTime } from '../../lib/formatDate'

const pollingInterval = 1000 // milliseconds

export const Chat = ({ title, chatId, token }) => {
  const { person } = useAuth()
  const [chat, setChat] = React.useState(null)
  const [error, setError] = React.useState('')
  const [updating, setUpdating] = React.useState(true) // it should be actuated only ONE time

  const update = () => {
    getChat(token, chatId)
      .then((res) => {
        setChat(res)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  useEffect(() => {
    update()
    const timer = setTimeout(() => {
      console.log('polling...')
      update()
    }, pollingInterval)
    return () => clearTimeout(timer)
  }, [chat])

  const message = (message) => {
    const isMyMessage = person?.id === message?.created_by
    const formattedCreatedAt = formatDateTime(message.created_at)
    const backgroundColor = isMyMessage ? 'beige' : 'white'
    return (
      <Comment key={message.id} style={{ backgroundColor: backgroundColor }}>
        <Comment.Content>
          <Comment.Author>
            <big>
              <b>{message.author_name}</b>
            </big>
            &nbsp;{formattedCreatedAt}
          </Comment.Author>
          <Comment.Text>
            <div>
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
            </div>
          </Comment.Text>
        </Comment.Content>
      </Comment>
    )
  }

  return (
    <>
      {error && (
        <ErrorWrapper header="Unable to get chat updates" error={error} />
      )}

      <Comment.Group>
        <Header as="h3" dividing>
          {title}
        </Header>
      </Comment.Group>

      {chat?.messages?.map((m) => {
        return message(m)
      })}

      {updating && <JustOneSecond title="Updating chat messages..." />}

      <ChatForm chatId={chatId} token={token} onPostMessage={update} />
    </>
  )
}
