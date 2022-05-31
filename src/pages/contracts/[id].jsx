import React from 'react'
import getConfig from 'next/config'
import { Header } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { fetchWithToken } from '../../lib/fetcher'

import Layout from '../../components/Layout'
import ContractCard from '../../components/ContractCard/ContractCard'
import ErrorWrapper from '../../components/ErrorWrapper'
import JustOneSecond from '../../components/JustOneSecond'
import { useAuth } from '../../hooks'

const useContract = () => {
  const { publicRuntimeConfig } = getConfig()
  const { token } = useAuth()
  const { query } = useRouter()

  const { data: contract, error } = useSWR(
    () =>
      query.id && [
        `${publicRuntimeConfig.api_url}/contracts/${query.id}`,
        token,
      ],
    fetchWithToken
  )

  if (error) return { error }
  if (!contract) return { isLoading: true }

  return { contract }
}

const ContractPage = () => {
  const { person, token } = useAuth()
  const { contract, isLoading, error } = useContract()

  return (
    <>
      <Header as="h1">Contract</Header>

      {error && <ErrorWrapper header="Failed to load contract" error={error} />}

      {isLoading && <JustOneSecond />}

      {contract && (
        <ContractCard contract={contract} person={person} token={token} />
      )}
    </>
  )
}

ContractPage.requiresAuth = true

ContractPage.getLayout = (page) => (
  <Layout
    meta={{
      title: 'Contract | Optrispace',
      description: 'Welcome to Optrispace',
    }}
  >
    {page}
  </Layout>
)

export default ContractPage
