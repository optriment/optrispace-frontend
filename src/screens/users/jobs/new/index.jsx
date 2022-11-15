import React from 'react'
import { Header, Grid } from 'semantic-ui-react'
import { ProfileIsNotConfigured } from '../../../../components/ProfileIsNotConfigured'
import { NewJobForm } from '../../../../forms/NewJobForm'
import { isEmptyString } from '../../../../lib/validators'

export const NewJobScreen = ({ person, token, coinSymbol }) => {
  return (
    <Grid stackable columns={1}>
      <Grid.Column>
        <Header as="h1" content="Add New Job" />
      </Grid.Column>

      <Grid.Column>
        {isEmptyString(person.ethereum_address) ? (
          <ProfileIsNotConfigured />
        ) : (
          <NewJobForm person={person} token={token} coinSymbol={coinSymbol} />
        )}
      </Grid.Column>
    </Grid>
  )
}
