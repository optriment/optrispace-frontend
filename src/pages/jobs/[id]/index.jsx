import React, { useEffect, useContext } from 'react'
import { JobScreen } from '../../../screens/users/jobs/show'
import DisplayContext from '../../../context/display-context'
import { UsersLayout } from '../../../layouts/Users'
import { useRouter } from 'next/router'
import { useJob } from '../../../hooks/useJob'
import { LandingLayout } from '../../../layouts/Landing'
import JustOneSecond from '../../../components/JustOneSecond'
import ErrorWrapper from '../../../components/ErrorWrapper'
import { useAuth } from '../../../hooks'

const Page = () => {
  const { query } = useRouter()
  const { isLoading: personLoading, isAuthenticated } = useAuth()
  const { job, isLoading: jobLoading, error: jobError } = useJob(query.id)
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

  if (jobLoading) {
    return (
      <LandingLayout>
        <JustOneSecond title="Loading job..." />
      </LandingLayout>
    )
  }

  if (jobError) {
    return (
      <LandingLayout>
        <ErrorWrapper header="Unable to load job" error={jobError} />
      </LandingLayout>
    )
  }

  if (!isAuthenticated) {
    return (
      <LandingLayout meta={{ title: `Job: ${job.title}` }}>
        <JobScreen job={job} />
      </LandingLayout>
    )
  }

  return (
    <UsersLayout meta={{ title: `Job: ${job.title}` }}>
      <JobScreen job={job} />
    </UsersLayout>
  )
}

export default Page
