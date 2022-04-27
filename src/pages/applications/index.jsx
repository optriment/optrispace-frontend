import React from 'react'
import getConfig from 'next/config'

import { Grid, Header, Segment } from 'semantic-ui-react'

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

const Page = () => {
  const { person } = useAuth()
  const { applications, isLoading, error } = useMyApplications()

  return (
    <Layout>
      <Segment vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" style={{ fontSize: '3em' }}>
                Applications
              </Header>

              {error && (
                <ErrorWrapper
                  header="Failed to load applications"
                  error={error}
                />
              )}

              {isLoading && <JustOneSecond />}

              {applications && (
                <ApplicationsList applications={applications} person={person} />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Layout>
  )
}

Page.requiresAuth = true
Page.redirectUnauthenticatedTo = '/sign_in'

export default Page
