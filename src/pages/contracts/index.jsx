import React from 'react'
import getConfig from 'next/config'

import { Grid, Header, Segment } from 'semantic-ui-react'

import useSWR from 'swr'
import { fetchWithToken } from '../../lib/fetcher'
import { useFetchPerson } from '../../lib/person'

import ContractsList from '../../components/ContractsList'
import ErrorWrapper from '../../components/ErrorWrapper'

export default function ContractsIndex() {
  const { publicRuntimeConfig } = getConfig()

  const { person } = useFetchPerson()

  const { data, error } = useSWR(
    () =>
      person ? [`${publicRuntimeConfig.api_url}/contracts`, person.id] : null,
    fetchWithToken
  )

  if (!person) {
    return (
      <Segment vertical>
        <p>Loading person...</p>
      </Segment>
    )
  }

  if (error) {
    return <ErrorWrapper header="Failed to load contracts" error={error} />
  }

  if (!data) {
    return (
      <Segment vertical>
        <p>Loading contracts...</p>
      </Segment>
    )
  }

  return (
    <Segment vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" style={{ fontSize: '3em' }}>
              Contracts
            </Header>

            {data.length > 0 ? (
              <ContractsList contracts={data} />
            ) : (
              <div>No contracts</div>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
