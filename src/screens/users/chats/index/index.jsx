import React, { useState } from 'react'
import {
  Divider,
  Icon,
  Segment,
  Grid,
  Header,
  Message,
} from 'semantic-ui-react'
import { Chat } from '../../../../components/Chat'
import ChatsList from '../../../../components/ChatsList'

export const ChatsScreen = ({ chats, person, token }) => {
  const [selectedChatId, setSelectedChatId] = useState(null)

  const onSelectChat = (chatId) => {
    setSelectedChatId(chatId)
  }

  return (
    <>
      <Header as="h1">Chats</Header>

      <Message warning icon>
        <Icon name="chat" />

        <Message.Content>
          <Message.Header>
            Friendly reminder from OptriSpace Team
          </Message.Header>

          <Divider />

          <p>
            It is the first version of our internal chat system on OptriSpace.
            <br />
            Please report any bugs, ideas or issues via our
            <a
              href="https://github.com/optriment/optrispace-frontend/issues/new"
              target="_blank"
              rel="noreferrer nofollow noopener"
            >
              {' GitHub Issues '}
            </a>
            or
            <a
              href="https://discord.gg/7WEbtmuqtv"
              target="_blank"
              rel="noreferrer nofollow noopener"
            >
              {' Discord'}
            </a>
            .
          </p>
        </Message.Content>
      </Message>

      <Grid columns={2}>
        <Grid.Column width={6}>
          <Segment>
            <ChatsList
              chats={chats}
              person={person}
              onSelectChat={onSelectChat}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment>
            {selectedChatId ? (
              <Chat chatId={selectedChatId} token={token} />
            ) : (
              <p>Please select chat</p>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  )
}
