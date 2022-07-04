import React from 'react'
import getConfig from 'next/config'
import Link from 'next/link'

import { Grid, Divider, Button, Header } from 'semantic-ui-react'

import useSWR from 'swr'
import { fetcher } from '../../lib/fetcher'

import Layout from '../../components/Layout'
import JobsList from '../../components/JobsList'
import ErrorWrapper from '../../components/ErrorWrapper'
import JustOneSecond from '../../components/JustOneSecond'
import { useAuth } from '../../hooks'

const useJobs = () => {
  const { publicRuntimeConfig } = getConfig()

  const { data, error } = useSWR(`${publicRuntimeConfig.api_url}/jobs`, fetcher)

  if (error) return { error }
  if (!data) return { isLoading: true }

  return { jobs: data }
}

const JobsPage = () => {
  const { jobs, isLoading, error } = useJobs()
  const { person } = useAuth()

  return (
    <>
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={13}>
            <Header as="h1">Jobs</Header>
          </Grid.Column>

          {person && (
            <Grid.Column width={3} textAlign="right">
              <Link href="/jobs/new" passHref>
                <Button
                  primary
                  floated="right"
                  labelPosition="left"
                  icon="add circle"
                  content="New Job"
                />
              </Link>
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>

      <Divider hidden />

      {error && <ErrorWrapper header="Failed to load jobs" error={error} />}

      {isLoading && <JustOneSecond />}

      {jobs && <JobsList jobs={jobs} person={person} />}
    </>
  )
}

JobsPage.getLayout = (page) => (
  <Layout
    meta={{
      title: 'Jobs | OptriSpace',
    }}
  >
    {page}
  </Layout>
)

export default JobsPage
