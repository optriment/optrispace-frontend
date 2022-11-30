import React from 'react'
import { Label, Comment } from 'semantic-ui-react'
import { formatDateTime } from '../../lib/formatDate'

export const ChatMessage = ({ person, message }) => {
  const isMyMessage = person?.id === message?.created_by
  const formattedCreatedAt = formatDateTime(message.created_at)
  const messageColor = isMyMessage ? 'blue' : 'gray'
  const textAlign = isMyMessage ? 'right' : 'left'

  return (
    <Comment
      key={message.id}
      style={{ paddingLeft: '0.5em', paddingRight: '0.5em' }}
    >
      <Comment.Content style={{ textAlign: textAlign }}>
        <Comment.Text>
          <Label color={messageColor} style={{ lineHeight: '130%' }}>
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
          </Label>
        </Comment.Text>

        <Comment.Metadata>
          <span>{formattedCreatedAt}</span>
        </Comment.Metadata>
      </Comment.Content>
    </Comment>
  )
}
