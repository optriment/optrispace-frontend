import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import isJobOwner from '../../../../lib/job'
import JustOneSecond from '../../../../components/JustOneSecond'
import { useAuth } from '../../../../hooks'
import ErrorWrapper from '../../../../components/ErrorWrapper'
import { useJob } from '../../../../hooks/useJob'
import { useApplication } from '../../../../hooks/useApplication'
import { UsersLayout } from '../../../../layouts/Users'
import { NewContractScreen } from '../../../../screens/users/contracts/new'
import { LandingLayout } from '../../../../layouts/Landing'
import Web3Context from '../../../../context/web3-context'
import { isEmptyString } from '../../../../lib/validators'

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
  const {
    application,
    isLoading: applicationLoading,
    error: applicationError,
  } = useApplication(token, query?.application_id)
  const { coinSymbol } = useContext(Web3Context)

  if (isEmptyString(query?.application_id)) {
    return (
      <LandingLayout>
        <ErrorWrapper header="Application ID is missing" />
      </LandingLayout>
    )
  }

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

  if (applicationLoading) {
    return (
      <UsersLayout>
        <JustOneSecond title="Loading application..." />
      </UsersLayout>
    )
  }

  if (applicationError) {
    return (
      <UsersLayout>
        <ErrorWrapper
          header="Unable to load application"
          error={applicationError}
        />
      </UsersLayout>
    )
  }

  if (application.job_id !== job.id) {
    return (
      <UsersLayout>
        <ErrorWrapper header="You don't have access to this action" />
      </UsersLayout>
    )
  }

  return (
    <UsersLayout meta={{ title: 'New Contract' }}>
      <NewContractScreen
        job={job}
        application={application}
        person={person}
        token={token}
        coinSymbol={coinSymbol}
      />
    </UsersLayout>
  )
}

Page.requiresAuth = true

export default Page
