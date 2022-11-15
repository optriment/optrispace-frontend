import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import ErrorWrapper from '../../../../components/ErrorWrapper'
import { ProfileIsNotConfigured } from '../../../../components/ProfileIsNotConfigured'
import { NewContractForm } from '../../../../forms/NewContractForm'
import { isEmptyString } from '../../../../lib/validators'

export const NewContractScreen = ({
  job,
  application,
  person,
  token,
  coinSymbol,
}) => {
  return (
    <Grid stackable columns={1}>
      <Grid.Column textAlign="center">
        <Header as="h1">Add New Contract</Header>
      </Grid.Column>

      <Grid.Column>
        {isEmptyString(person.ethereum_address) ? (
          <ProfileIsNotConfigured />
        ) : (
          <>
            {isEmptyString(application.applicant_ethereum_address) ? (
              <ErrorWrapper
                header="You can not create contract right now"
                error="Applicant does not have configured wallet address"
              />
            ) : (
              <NewContractForm
                job={job}
                application={application}
                token={token}
                coinSymbol={coinSymbol}
              />
            )}
          </>
        )}
      </Grid.Column>
    </Grid>
  )
}
