import React from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { Grid } from 'semantic-ui-react'
import useSWR from 'swr'
import { fetcher } from '../../lib/fetcher'
import Layout from '../../components/Layout'
import JobCard from '../../components/JobCard/JobCard'
import ErrorWrapper from '../../components/ErrorWrapper'
import JustOneSecond from '../../components/JustOneSecond'
import Sidebar from '../../components/Sidebar'

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
      {error && <ErrorWrapper header="Failed to load job" error={error} />}

      {isLoading && <JustOneSecond />}

      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={11}>{job && <JobCard job={job} />}</Grid.Column>
          <Grid.Column width={5}>
            <Sidebar />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

JobPage.getLayout = (page) => (
  <Layout
    meta={{
      title: 'Job Card | OptriSpace',
    }}
  >
    {page}
  </Layout>
)

export default JobPage
