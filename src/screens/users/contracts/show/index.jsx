import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { ContractCardForCustomer } from '../../../../components/ContractCardForCustomer'
import { ContractCardForContractor } from '../../../../components/ContractCardForContractor'
import { ProfileIsNotConfigured } from '../../../../components/ProfileIsNotConfigured'
import { isEmptyString } from '../../../../lib/validators'

export const ContractScreen = ({
  contract,
  person,
  token,
  coinSymbol,
  chat,
}) => {
  return (
    <Grid stackable columns={1}>
      <Grid.Column textAlign="center">
        <Header as="h1">{contract.title}</Header>
      </Grid.Column>

      <Grid.Column>
        {isEmptyString(person.ethereum_address) ? (
          <ProfileIsNotConfigured />
        ) : (
          <>
            {contract.customer_id === person.id ? (
              <ContractCardForCustomer
                contract={contract}
                person={person}
                token={token}
                coinSymbol={coinSymbol}
                chat={chat}
              />
            ) : (
              <ContractCardForContractor
                contract={contract}
                person={person}
                token={token}
                coinSymbol={coinSymbol}
                chat={chat}
              />
            )}
          </>
        )}
      </Grid.Column>
    </Grid>
  )
}
