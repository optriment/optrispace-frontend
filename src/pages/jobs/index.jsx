import React from 'react'
import getConfig from 'next/config'
import Link from 'next/link'

import { Container, Segment, Divider, Button, Header } from 'semantic-ui-react'

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
      <Segment basic padded textAlign="center">
        <Header as="h1">Find a Job. Find a Pro</Header>
      </Segment>

      {person && (
        <Container textAlign="right">
          <Link href="/jobs/new" passHref>
            <Button
              primary
              labelPosition="left"
              icon="add circle"
              content="New Job"
            />
          </Link>
        </Container>
      )}

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
