import React from 'react'
import getConfig from 'next/config'
import { Segment } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { useFetchPerson } from '../../lib/person'
import { fetchWithToken } from '../../lib/fetcher'
import ContractCard from '../../components/ContractCard/ContractCard'
import ErrorWrapper from '../../components/ErrorWrapper'

export default function Contract() {
  const { publicRuntimeConfig } = getConfig()

  const { person } = useFetchPerson()

  const { query } = useRouter()

  const { data: contract, error: contractError } = useSWR(
    () =>
      person && query.id
        ? [`${publicRuntimeConfig.api_url}/contracts/${query.id}`, person.id]
        : null,
    fetchWithToken
  )

  if (!person) {
    return (
      <Segment vertical>
        <p>Loading person...</p>
      </Segment>
    )
  }

  if (contractError) {
    return (
      <ErrorWrapper header="Failed to load contract" error={contractError} />
    )
  }

  if (!contract) {
    return (
      <Segment vertical>
        <p>Loading contract...</p>
      </Segment>
    )
  }

  return (
    <Segment vertical>
      <ContractCard contract={contract} person={person} />
    </Segment>
  )
}
