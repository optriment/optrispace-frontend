import React from 'react'
import { List } from 'semantic-ui-react'
import ChatListItem from './ChatListItem'

export default function ChatsList({ chats, person, onSelectChat }) {
  return (
    <List
      selection
      divided
      verticalAlign="top"
      style={{ height: '600px', overflow: 'auto' }}
    >
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          person={person}
          onSelectChat={onSelectChat}
        />
      ))}
    </List>
  )
}
