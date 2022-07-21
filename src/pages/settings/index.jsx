import React from 'react'
import ErrorWrapper from '../../components/ErrorWrapper'
import JustOneSecond from '../../components/JustOneSecond'
import { useAuth } from '../../hooks'
import { LandingLayout } from '../../layouts/Landing'
import { UsersLayout } from '../../layouts/Users'
import { SettingsScreen } from '../../screens/users/settings'

const Page = () => {
  const { isLoading: personLoading, isAuthenticated } = useAuth()

  if (personLoading) {
    return (
      <LandingLayout>
        <JustOneSecond title="Loading profile..." />
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

  return (
    <UsersLayout meta={{ title: 'Settings' }}>
      <SettingsScreen />
    </UsersLayout>
  )
}

Page.requiresAuth = true

export default Page
