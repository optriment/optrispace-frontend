import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import ApplicationsList from '../../../../components/ApplicationsList'

export const ApplicationsScreen = ({ applications, person, coinSymbol }) => {
  return (
    <Grid stackable columns={1}>
      <Grid.Column textAlign="center">
        <Header as="h1">Applications</Header>
      </Grid.Column>

      <Grid.Column>
        <ApplicationsList
          applications={applications}
          person={person}
          coinSymbol={coinSymbol}
        />
      </Grid.Column>
    </Grid>
  )
}
