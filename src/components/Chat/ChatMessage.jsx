import React from 'react'
import { Comment } from 'semantic-ui-react'
import { formatDateTime } from '../../lib/formatDate'

export const ChatMessage = ({ person, message }) => {
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
