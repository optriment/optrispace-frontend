import React from 'react'
import { Card } from 'semantic-ui-react'
import ContractListItem from './ContractListItem'

export default function ContractsList({ contracts, person, coinSymbol }) {
  return (
    <Card.Group>
      {contracts.map((contract) => (
        <ContractListItem
          key={contract.id}
          contract={contract}
          person={person}
          coinSymbol={coinSymbol}
        />
      ))}
    </Card.Group>
  )
}
