import React from 'react'
import getConfig from 'next/config'

import { Grid, Header, Segment } from 'semantic-ui-react'

import useSWR from 'swr'
import { fetchWithToken } from '../../lib/fetcher'

import Layout from '../../components/Layout'
import ContractsList from '../../components/ContractsList'
import ErrorWrapper from '../../components/ErrorWrapper'
import JustOneSecond from '../../components/JustOneSecond'

import { useAuth } from '../../hooks'

const useContracts = () => {
  const { publicRuntimeConfig } = getConfig()

  const { loading, token } = useAuth()

  const { data, error } = useSWR(
    () =>
      !loading && token && [`${publicRuntimeConfig.api_url}/contracts`, token],
    fetchWithToken
  )

  if (error) return { error }
  if (!data) return { isLoading: true }

  return { contracts: data }
}

const Page = () => {
  const { person } = useAuth()
  const { contracts, isLoading, error } = useContracts()

  return (
    <Layout>
      <Segment vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" style={{ fontSize: '3em' }}>
                Contracts
              </Header>

              {error && (
                <ErrorWrapper header="Failed to load contracts" error={error} />
              )}

              {isLoading && <JustOneSecond />}

              {contracts && (
                <ContractsList contracts={contracts} person={person} />
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
