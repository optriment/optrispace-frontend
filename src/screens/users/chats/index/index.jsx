import React, { useState } from 'react'
import Link from 'next/link'
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
  const [selectedChat, setSelectedChat] = useState(null)

  const onSelectChat = (chat) => {
    setSelectedChat(chat)
  }

  return (
    <Grid stackable columns={1}>
      <Grid.Column textAlign="center">
        <Header as="h1">Chats</Header>
      </Grid.Column>

      {chats.length > 0 && (
        <Grid.Column>
          <Message warning icon>
            <Icon name="chat" />

            <Message.Content>
              <Message.Header>
                Friendly reminder from OptriSpace Team
              </Message.Header>

              <Divider />

              <p>
                It is the first version of our internal chat system on
                OptriSpace.
                <br />
                Right now chats are loading approximately 5 seconds. It is not a
                bug.
              </p>

              <p>
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

          <Grid stackable columns={1}>
            <Grid.Column mobile={16} computer={6}>
              <Segment>
                <ChatsList
                  chats={chats}
                  person={person}
                  onSelectChat={onSelectChat}
                />
              </Segment>
            </Grid.Column>

            <Grid.Column mobile={16} computer={10}>
              <Segment>
                {selectedChat ? (
                  <>
                    <Header as="h3">
                      {selectedChat.contract_id ? (
                        <>
                          Contract:{' '}
                          <Link href={`/contracts/${selectedChat.contract_id}`}>
                            {selectedChat.title}
                          </Link>
                        </>
                      ) : (
                        <>
                          Job:{' '}
                          <Link href={`/jobs/${selectedChat.job_id}`}>
                            {selectedChat.title}
                          </Link>
                        </>
                      )}
                    </Header>

                    <Divider />

                    <Chat chatId={selectedChat.id} token={token} />
                  </>
                ) : (
                  <p>Please select a chat</p>
                )}
              </Segment>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      )}
    </Grid>
  )
}
