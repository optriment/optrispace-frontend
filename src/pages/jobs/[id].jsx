import React from 'react'
import getConfig from 'next/config'
import { Header } from 'semantic-ui-react'
import { useRouter } from 'next/router'

import useSWR from 'swr'
import { fetcher } from '../../lib/fetcher'

import Layout from '../../components/Layout'
import JobCard from '../../components/JobCard/JobCard'
import ErrorWrapper from '../../components/ErrorWrapper'
import JustOneSecond from '../../components/JustOneSecond'

const useJob = () => {
  const { publicRuntimeConfig } = getConfig()
  const { query } = useRouter()

  const { data: job, error } = useSWR(
    () => query.id && `${publicRuntimeConfig.api_url}/jobs/${query.id}`,
    fetcher
  )

  if (error) return { error }
  if (!job) return { isLoading: true }

  return { job }
}

const JobPage = () => {
  const { job, isLoading, error } = useJob()

  return (
    <>
      <Header as="h1">Job</Header>

      {error && <ErrorWrapper header="Failed to load job" error={error} />}

      {isLoading && <JustOneSecond />}

      {job && <JobCard job={job} />}
    </>
  )
}

JobPage.getLayout = (page) => (
  <Layout
    meta={{
      title: 'Job Card | Optrispace',
      description: 'Welcome to Optrispace',
    }}
  >
    {page}
  </Layout>
)

export default JobPage
