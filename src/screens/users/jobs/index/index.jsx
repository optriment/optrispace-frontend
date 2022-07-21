import React from 'react'
import Link from 'next/link'
import { Grid, Container, Divider, Button, Header } from 'semantic-ui-react'
import JobsList from '../../../../components/JobsList'
import { Sidebar } from '../../../../components/Sidebar'
import { useAuth } from '../../../../hooks'

export const JobsScreen = () => {
  const { person } = useAuth()

  return (
    <>
      <Header as="h1">Find a Job. Find a Pro</Header>

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

      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={11}>
            <JobsList />
          </Grid.Column>
          <Grid.Column width={5}>
            <Sidebar />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
