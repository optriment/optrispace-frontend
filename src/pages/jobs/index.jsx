import React, { useContext } from 'react'
import ErrorWrapper from '../../components/ErrorWrapper'
import JustOneSecond from '../../components/JustOneSecond'
import Web3Context from '../../context/web3-context'
import { useAuth } from '../../hooks'
import { useJobs } from '../../hooks/useJobs'
import { LandingLayout } from '../../layouts/Landing'
import { UsersLayout } from '../../layouts/Users'
import { JobsScreen } from '../../screens/users/jobs/index'

const Page = () => {
  const { isLoading: personLoading, isAuthenticated, person } = useAuth()
  const { jobs, isLoading: jobsLoading, error: jobsError } = useJobs()
  const { coinSymbol } = useContext(Web3Context)

  if (jobsLoading) {
    return (
      <LandingLayout>
        <JustOneSecond title="Loading jobs..." />
      </LandingLayout>
    )
  }

  if (jobsError) {
    return (
      <LandingLayout>
        <ErrorWrapper header="Unable to load jobs" error={jobsError} />
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

  if (!isAuthenticated) {
    return (
      <LandingLayout meta={{ title: 'Jobs' }}>
        <JobsScreen jobs={jobs} coinSymbol={coinSymbol} />
      </LandingLayout>
    )
  }

  return (
    <UsersLayout meta={{ title: 'Jobs' }}>
      <JobsScreen jobs={jobs} person={person} coinSymbol={coinSymbol} />
    </UsersLayout>
  )
}

export default Page
