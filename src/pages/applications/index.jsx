import React, { useContext } from 'react'
import ErrorWrapper from '../../components/ErrorWrapper'
import JustOneSecond from '../../components/JustOneSecond'
import Web3Context from '../../context/web3-context'
import { useAuth } from '../../hooks'
import { useApplications } from '../../hooks/useApplications'
import { LandingLayout } from '../../layouts/Landing'
import { UsersLayout } from '../../layouts/Users'
import { ApplicationsScreen } from '../../screens/users/applications/index'

const Page = () => {
  const {
    isLoading: personLoading,
    error: personError,
    isAuthenticated,
    person,
    token,
  } = useAuth()
  const {
    applications,
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useApplications(token)
  const { coinSymbol } = useContext(Web3Context)

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
        <ErrorWrapper header="Internal Server Error" error={personError} />
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

  if (applicationsLoading) {
    return (
      <UsersLayout meta={{ title: 'Applications' }}>
        <JustOneSecond title="Loading applications..." />
      </UsersLayout>
    )
  }

  if (applicationsError) {
    return (
      <UsersLayout meta={{ title: 'Applications' }}>
        <ErrorWrapper
          header="Unable to load applications"
          error={applicationsError}
        />
      </UsersLayout>
    )
  }

  return (
    <UsersLayout meta={{ title: 'Applications' }}>
      <ApplicationsScreen
        applications={applications}
        person={person}
        coinSymbol={coinSymbol}
      />
    </UsersLayout>
  )
}

Page.requiresAuth = true

export default Page
