import React from 'react'
import { Card } from 'semantic-ui-react'
import ContractListItem from './ContractListItem'

export default function ContractsList({ contracts, person, tokenSymbol }) {
  return (
    <Card.Group>
      {contracts.map((contract) => (
        <ContractListItem
          key={contract.id}
          contract={contract}
          person={person}
          tokenSymbol={tokenSymbol}
        />
      ))}
    </Card.Group>
  )
}
