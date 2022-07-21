import React from 'react'
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

const Page = () => {
  const { query } = useRouter()
  const { isLoading: personLoading, isAuthenticated, person, token } = useAuth()
  const { job, isLoading: jobLoading, error: jobError } = useJob(query.id)
  const {
    application,
    isLoading: applicationLoading,
    error: applicationError,
  } = useApplication(token, query.application_id)

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

  if (application.job.id !== job.id) {
    return (
      <UsersLayout>
        <ErrorWrapper header="You don't have access to this action" />
      </UsersLayout>
    )
  }

  return (
    <UsersLayout meta={{ title: 'New Contract' }}>
      <NewContractScreen job={job} application={application} token={token} />
    </UsersLayout>
  )
}

Page.requiresAuth = true

export default Page
