import React, { useEffect, useContext } from 'react'
import { LandingLayout } from '../layouts/Landing'
import { UsersLayout } from '../layouts/Users'
import { useAuth } from '../hooks'
import { LandingScreen } from '../screens/landing'
import { DashboardScreen } from '../screens/users/dashboard'
import DisplayContext from '../context/display-context'
import JustOneSecond from '../components/JustOneSecond'

const Page = () => {
  const { isLoading: personLoading, isAuthenticated } = useAuth()
  const { isSmallScreen, setSmallScreen } = useContext(DisplayContext)

  useEffect(() => {
    setSmallScreen(window.matchMedia('(max-width: 700px)').matches)
  }, [])

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
        <LandingScreen isSmallScreen={isSmallScreen} />
      </LandingLayout>
    )
  }

  return (
    <UsersLayout meta={{ title: 'Dashboard' }}>
      <DashboardScreen isSmallScreen={isSmallScreen} />
    </UsersLayout>
  )
}

export default Page
