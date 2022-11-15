import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import ContractListItem from './ContractListItem'

export default function ContractsList({ contracts, person, coinSymbol }) {
  return (
    <Grid columns={1}>
      {contracts.map((contract) => {
        return (
          <Grid.Column key={contract.id}>
            <Segment>
              <ContractListItem
                key={contract.id}
                contract={contract}
                person={person}
                coinSymbol={coinSymbol}
              />
            </Segment>
          </Grid.Column>
        )
      })}
    </Grid>
  )
}
