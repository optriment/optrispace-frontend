import React from 'react'
import getConfig from 'next/config'

import { Grid, Header, Segment } from 'semantic-ui-react'

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

export default function JobsIndex() {
  const { jobs, isLoading, error } = useJobs()
  const { person } = useAuth()

  return (
    <Layout>
      <Segment vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" style={{ fontSize: '3em' }}>
                Jobs
              </Header>

              {error && (
                <ErrorWrapper header="Failed to load jobs" error={error} />
              )}

              {isLoading && <JustOneSecond />}

              {jobs && <JobsList jobs={jobs} person={person} />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Layout>
  )
}
