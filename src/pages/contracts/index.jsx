import React from 'react'
import getConfig from 'next/config'

import { Grid, Divider, Header } from 'semantic-ui-react'

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

const ContractsPage = () => {
  const { person } = useAuth()
  const { contracts, isLoading, error } = useContracts()

  return (
    <>
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <Header as="h1">Contracts</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider hidden />

      {error && (
        <ErrorWrapper header="Failed to load contracts" error={error} />
      )}

      {isLoading && <JustOneSecond />}

      {contracts && <ContractsList contracts={contracts} person={person} />}
    </>
  )
}

ContractsPage.requiresAuth = true

ContractsPage.getLayout = (page) => (
  <Layout
    meta={{
      title: 'Contracts | OptriSpace',
    }}
  >
    {page}
  </Layout>
)

export default ContractsPage
