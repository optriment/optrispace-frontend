import React from 'react'
import { UsersLayout } from '../../layouts/Users'
import { NewJobScreen } from '../../screens/users/jobs/new'
import { useAuth } from '../../hooks'
import JustOneSecond from '../../components/JustOneSecond'
import { LandingLayout } from '../../layouts/Landing'
import ErrorWrapper from '../../components/ErrorWrapper'

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
    <UsersLayout meta={{ title: 'New Job' }}>
      <NewJobScreen />
    </UsersLayout>
  )
}

Page.requiresAuth = true

export default Page
