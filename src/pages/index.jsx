import React from 'react'
import { LandingLayout } from '../layouts/Landing'
import { UsersLayout } from '../layouts/Users'
import { useAuth } from '../hooks'
import { LandingScreen } from '../screens/landing'
import { DashboardScreen } from '../screens/users/dashboard'
import JustOneSecond from '../components/JustOneSecond'

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
      <LandingLayout meta={{ title: 'Find a Job! Find a Pro!' }}>
        <LandingScreen />
      </LandingLayout>
    )
  }

  return (
    <UsersLayout meta={{ title: 'Dashboard' }}>
      <DashboardScreen />
    </UsersLayout>
  )
}

export default Page
