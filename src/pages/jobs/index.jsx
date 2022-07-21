import React from 'react'
import JustOneSecond from '../../components/JustOneSecond'
import { useAuth } from '../../hooks'
import { LandingLayout } from '../../layouts/Landing'
import { UsersLayout } from '../../layouts/Users'
import { JobsScreen } from '../../screens/users/jobs/index'

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
      <LandingLayout meta={{ title: 'Jobs' }}>
        <JobsScreen />
      </LandingLayout>
    )
  }

  return (
    <UsersLayout meta={{ title: 'Jobs' }}>
      <JobsScreen />
    </UsersLayout>
  )
}

export default Page
