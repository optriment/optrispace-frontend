import React, { useContext } from 'react'
import ErrorWrapper from '../../components/ErrorWrapper'
import JustOneSecond from '../../components/JustOneSecond'
import Web3Context from '../../context/web3-context'
import { useAuth } from '../../hooks'
import { useJobs } from '../../hooks/useJobs'
import { useStats } from '../../hooks/useStats'
import { LandingLayout } from '../../layouts/Landing'
import { UsersLayout } from '../../layouts/Users'
import { JobsScreen } from '../../screens/users/jobs/index'

const Page = () => {
  const { isLoading: personLoading, isAuthenticated, person } = useAuth()
  const { jobs, isLoading: jobsLoading, error: jobsError } = useJobs()
  const { stats, isLoading: statsLoading, error: statsError } = useStats()
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

  if (statsLoading) {
    return (
      <LandingLayout>
        <JustOneSecond title="Loading stats..." />
      </LandingLayout>
    )
  }

  if (statsError) {
    return (
      <LandingLayout>
        <ErrorWrapper header="Unable to load stats" error={statsError} />
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
        <JobsScreen jobs={jobs} stats={stats} coinSymbol={coinSymbol} />
      </LandingLayout>
    )
  }

  return (
    <UsersLayout meta={{ title: 'Jobs' }}>
      <JobsScreen
        jobs={jobs}
        stats={stats}
        person={person}
        coinSymbol={coinSymbol}
      />
    </UsersLayout>
  )
}

export default Page
