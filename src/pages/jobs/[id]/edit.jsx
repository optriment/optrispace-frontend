import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { UsersLayout } from '../../../layouts/Users'
import isJobOwner from '../../../lib/job'
import { useAuth } from '../../../hooks'
import JustOneSecond from '../../../components/JustOneSecond'
import ErrorWrapper from '../../../components/ErrorWrapper'
import { EditJobScreen } from '../../../screens/users/jobs/edit'
import { useJob } from '../../../hooks/useJob'
import DisplayContext from '../../../context/display-context'
import { LandingLayout } from '../../../layouts/Landing'
import Web3Context from '../../../context/web3-context'

const Page = () => {
  const { query } = useRouter()
  const {
    isLoading: personLoading,
    error: personError,
    isAuthenticated,
    person,
    token,
  } = useAuth()
  const { job, isLoading: jobLoading, error: jobError } = useJob(query.id)
  const { coinSymbol } = useContext(Web3Context)
  const { setSmallScreen } = useContext(DisplayContext)

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

  if (jobLoading) {
    return (
      <UsersLayout>
        <JustOneSecond title="Loading job..." />
      </UsersLayout>
    )
  }

  if (jobError) {
    return (
      <UsersLayout>
        <ErrorWrapper header="Unable to load job" error={jobError} />
      </UsersLayout>
    )
  }

  if (!isJobOwner(job, person)) {
    return (
      <UsersLayout>
        <ErrorWrapper header="You don't have access to this action" />
      </UsersLayout>
    )
  }

  return (
    <UsersLayout meta={{ title: 'Edit Job' }}>
      <EditJobScreen
        job={job}
        person={person}
        token={token}
        coinSymbol={coinSymbol}
      />
    </UsersLayout>
  )
}

Page.requiresAuth = true

export default Page
