import React, { useContext } from 'react'
import Link from 'next/link'
import { Grid, Container, Divider, Button, Header } from 'semantic-ui-react'
import JobsList from '../../../../components/JobsList'
import { Sidebar } from '../../../../components/Sidebar'
import { useAuth } from '../../../../hooks'
import Web3Context from '../../../../context/web3-context'

export const JobsScreen = () => {
  const { person } = useAuth()
  const { tokenSymbol } = useContext(Web3Context)

  return (
    <>
      <Header as="h1">Find a Job. Find a Pro</Header>

      {person && (
        <Container textAlign="right">
          <Link href="/jobs/new" passHref>
            <Button primary content="Add New Job" />
          </Link>
        </Container>
      )}

      <Divider hidden />

      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={11}>
            <JobsList currencyLabel={tokenSymbol} />
          </Grid.Column>
          <Grid.Column width={5}>
            <Sidebar />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
