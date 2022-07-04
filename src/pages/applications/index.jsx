import React from 'react'
import getConfig from 'next/config'

import { Grid, Divider, Header } from 'semantic-ui-react'

import useSWR from 'swr'
import { fetchWithToken } from '../../lib/fetcher'

import Layout from '../../components/Layout'
import ApplicationsList from '../../components/ApplicationsList'
import ErrorWrapper from '../../components/ErrorWrapper'
import JustOneSecond from '../../components/JustOneSecond'

import { useAuth } from '../../hooks'

const useMyApplications = () => {
  const { publicRuntimeConfig } = getConfig()

  const { loading, token } = useAuth()

  const { data, error } = useSWR(
    () =>
      !loading &&
      token && [`${publicRuntimeConfig.api_url}/applications/my`, token],
    fetchWithToken
  )

  if (error) return { error }
  if (!data) return { isLoading: true }

  return { applications: data }
}

const ApplicationsPage = () => {
  const { person } = useAuth()
  const { applications, isLoading, error } = useMyApplications()

  return (
    <>
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <Header as="h1">Applications</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider hidden />

      {error && (
        <ErrorWrapper header="Failed to load applications" error={error} />
      )}

      {isLoading && <JustOneSecond />}

      {applications && (
        <ApplicationsList applications={applications} person={person} />
      )}
    </>
  )
}

ApplicationsPage.requiresAuth = true

ApplicationsPage.getLayout = (page) => (
  <Layout
    meta={{
      title: 'Applications | OptriSpace',
    }}
  >
    {page}
  </Layout>
)

export default ApplicationsPage
