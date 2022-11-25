import React from 'react'
import ErrorWrapper from '../../components/ErrorWrapper'
import JustOneSecond from '../../components/JustOneSecond'
import { useAuth } from '../../hooks'
import { useChats } from '../../hooks/useChats'
import { LandingLayout } from '../../layouts/Landing'
import { UsersLayout } from '../../layouts/Users'
import { ChatsScreen } from '../../screens/users/chats/index'

const Page = () => {
  const {
    isLoading: personLoading,
    error: personError,
    isAuthenticated,
    person,
    token,
  } = useAuth()
  const { chats, isLoading: chatsLoading, error: chatsError } = useChats(token)

  // TODO: There should be added useInterval hook to update chats with interval

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

  if (chatsLoading) {
    return (
      <UsersLayout meta={{ title: 'Chats' }}>
        <JustOneSecond title="Loading chats..." />
      </UsersLayout>
    )
  }

  if (chatsError) {
    return (
      <UsersLayout meta={{ title: 'Chats' }}>
        <ErrorWrapper header="Unable to load chats" error={chatsError} />
      </UsersLayout>
    )
  }

  return (
    <UsersLayout meta={{ title: 'Chats' }}>
      <ChatsScreen chats={chats} person={person} token={token} />
    </UsersLayout>
  )
}

Page.requiresAuth = true

export default Page
