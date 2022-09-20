import React from 'react'
import { Header } from 'semantic-ui-react'
import ContractsList from '../../../../components/ContractsList'

export const ContractsScreen = ({ contracts, person, tokenSymbol }) => {
  return (
    <>
      <Header as="h1">Contracts</Header>

      <ContractsList
        contracts={contracts}
        person={person}
        tokenSymbol={tokenSymbol}
      />
    </>
  )
}
