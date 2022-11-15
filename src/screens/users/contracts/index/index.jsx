import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import ContractsList from '../../../../components/ContractsList'

export const ContractsScreen = ({ contracts, person, coinSymbol }) => {
  return (
    <Grid stackable columns={1}>
      <Grid.Column textAlign="center">
        <Header as="h1">Contracts</Header>
      </Grid.Column>

      <Grid.Column>
        <ContractsList
          contracts={contracts}
          person={person}
          coinSymbol={coinSymbol}
        />
      </Grid.Column>
    </Grid>
  )
}
