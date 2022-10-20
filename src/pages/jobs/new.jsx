import React, { useContext } from 'react'
import { UsersLayout } from '../../layouts/Users'
import { NewJobScreen } from '../../screens/users/jobs/new'
import { useAuth } from '../../hooks'
import JustOneSecond from '../../components/JustOneSecond'
import { LandingLayout } from '../../layouts/Landing'
import ErrorWrapper from '../../components/ErrorWrapper'
import Web3Context from '../../context/web3-context'

const Page = () => {
  const {
    isLoading: personLoading,
    error: personError,
    isAuthenticated,
    person,
    token,
  } = useAuth()
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

  return (
    <UsersLayout meta={{ title: 'New Job' }}>
      <NewJobScreen person={person} token={token} coinSymbol={coinSymbol} />
    </UsersLayout>
  )
}

Page.requiresAuth = true

export default Page
