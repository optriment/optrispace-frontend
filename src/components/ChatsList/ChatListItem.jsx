import React from 'react'
import { List } from 'semantic-ui-react'
import { formatDateTime } from '../../lib/formatDate'

export default function ChatListItem({ person, chat, onSelectChat }) {
  const lastMessageAt = formatDateTime(chat.last_message_at)

  const selectChat = () => {
    onSelectChat(chat)
  }

  const participant = chat.participants.find(
    (participant) => participant.id !== person.id
  )

  const icon = chat.contract_id ? 'file text' : 'file outline'
  const iconTitle = chat.contract_id ? 'Contract' : 'Job Application'

  return (
    <List.Item onClick={selectChat}>
      <List.Icon
        name={icon}
        title={iconTitle}
        size="large"
        verticalAlign="middle"
      />
      <List.Content>
        <List.Header>{participant.display_name}</List.Header>
        <List.Description>
          {lastMessageAt}
          <br />
          {chat.title}
        </List.Description>
      </List.Content>
    </List.Item>
  )
}
