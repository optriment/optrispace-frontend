import React from 'react'
import { Grid, Button, Header } from 'semantic-ui-react'
import JobsList from '../../../../components/JobsList'
import { Sidebar } from '../../../../components/Sidebar'
import { ProfileIsNotConfigured } from '../../../../components/ProfileIsNotConfigured'
import { isEmptyString } from '../../../../lib/validators'

export const JobsScreen = ({ jobs, stats, person, coinSymbol }) => {
  return (
    <Grid stackable columns={1}>
      <Grid.Column textAlign="center">
        <Header as="h1">OptriSpace</Header>
        <Header as="h2">
          No middlemen. No paperwork. Fast & Secure Payments.
        </Header>
      </Grid.Column>

      {person && (
        <Grid.Column>
          {isEmptyString(person.ethereum_address) ? (
            <ProfileIsNotConfigured />
          ) : (
            <Button
              as="a"
              primary
              href="/jobs/new"
              floated="right"
              content="Post a job"
            />
          )}
        </Grid.Column>
      )}

      <Grid.Column>
        <Grid columns={2} stackable>
          <Grid.Column mobile={16} computer={11}>
            <JobsList jobs={jobs} coinSymbol={coinSymbol} />
          </Grid.Column>

          <Grid.Column computer={5} only="computer">
            <Sidebar stats={stats} />
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid>
  )
}
