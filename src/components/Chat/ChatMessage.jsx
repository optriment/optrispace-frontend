import React from 'react'
import { Comment } from 'semantic-ui-react'
import { formatDateTime } from '../../lib/formatDate'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

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
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.text}
          </ReactMarkdown>
        </Comment.Text>
      </Comment.Content>
    </Comment>
  )
}
