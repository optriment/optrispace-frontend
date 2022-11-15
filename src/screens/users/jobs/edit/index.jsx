import React from 'react'
import { Header, Grid } from 'semantic-ui-react'
import { ProfileIsNotConfigured } from '../../../../components/ProfileIsNotConfigured'
import { EditJobForm } from '../../../../forms/EditJobForm'
import { isEmptyString } from '../../../../lib/validators'

export const EditJobScreen = ({ job, person, token, coinSymbol }) => {
  return (
    <Grid stackable columns={1}>
      <Grid.Column>
        <Header as="h1" content="Edit Job" />
      </Grid.Column>

      <Grid.Column>
        {isEmptyString(person.ethereum_address) ? (
          <ProfileIsNotConfigured />
        ) : (
          <EditJobForm job={job} token={token} coinSymbol={coinSymbol} />
        )}
      </Grid.Column>
    </Grid>
  )
}
