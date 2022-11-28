import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import ErrorWrapper from '../../../components/ErrorWrapper'
import JustOneSecond from '../../../components/JustOneSecond'
import Web3Context from '../../../context/web3-context'
import { useAuth } from '../../../hooks'
import { useChat } from '../../../hooks/useChat'
import { LandingLayout } from '../../../layouts/Landing'
import { UsersLayout } from '../../../layouts/Users'
import { ChatScreen } from '../../../screens/users/chats/show'

const Page = () => {
  const { query } = useRouter()
  const { coinSymbol } = useContext(Web3Context)

  const {
    isLoading: personLoading,
    error: personError,
    isAuthenticated,
    token,
  } = useAuth()

  const {
    chat,
    isLoading: chatLoading,
    error: chatError,
  } = useChat(token, query.id)

  if (personLoading) {
    return (
      <LandingLayout>
        <JustOneSecond title="Loading profile..." />
      </LandingLayout>
    )
  }

  if (personError) {
    return (
      <LandingLayout>
        <ErrorWrapper header="Authorization Error" error={personError} />
      </LandingLayout>
    )
  }

  if (!isAuthenticated) {
    return (
      <LandingLayout>
        <ErrorWrapper header="Please sign in" />
      </LandingLayout>
    )
  }

  if (chatLoading) {
    return (
      <UsersLayout>
        <JustOneSecond title="Loading chat..." />
      </UsersLayout>
    )
  }

  if (chatError) {
    return (
      <UsersLayout>
        <ErrorWrapper header="Unable to load chat" error={chatError} />
      </UsersLayout>
    )
  }

  return (
    <UsersLayout meta={{ title: `Chat ${chat.topic}` }}>
      <ChatScreen chat={chat} token={token} coinSymbol={coinSymbol} />
    </UsersLayout>
  )
}

Page.requiresAuth = true

export default Page
