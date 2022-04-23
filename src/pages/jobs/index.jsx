import React from 'react'
import getConfig from 'next/config'

import { Grid, Header, Segment } from 'semantic-ui-react'

import useSWR from 'swr'
import { fetcher } from '../../lib/fetcher'

import JobsList from '../../components/JobsList'
import ErrorWrapper from '../../components/ErrorWrapper'

export default function JobsIndex() {
  const { publicRuntimeConfig } = getConfig()

  const { data, error } = useSWR(`${publicRuntimeConfig.api_url}/jobs`, fetcher)

  if (error) {
    return <ErrorWrapper header="Failed to load jobs" error={error} />
  }

  if (!data) {
    return (
      <Segment vertical>
        <p>Loading jobs...</p>
      </Segment>
    )
  }

  return (
    <Segment vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" style={{ fontSize: '3em' }}>
              Jobs
            </Header>

            {data.length > 0 ? <JobsList jobs={data} /> : <div>No jobs</div>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
