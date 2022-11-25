import React from 'react'
import { List } from 'semantic-ui-react'

export default function ChatListItem({ person, chat, onSelectChat }) {
  const selectChat = () => {
    onSelectChat(chat.id)
  }

  const participant = chat.participants.find(
    (participant) => participant.id !== person.id
  )

  return (
    <List.Item onClick={selectChat}>
      <List.Content>
        <List.Header>{participant.display_name}</List.Header>
      </List.Content>
    </List.Item>
  )
}
