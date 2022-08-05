import React from 'react'
import { Card } from 'semantic-ui-react'
import { useAuth } from '../hooks'
import { useContracts } from '../hooks/useContracts'
import ContractListItem from './ContractListItem'
import ErrorWrapper from './ErrorWrapper'
import JustOneSecond from './JustOneSecond'

export default function ContractsList({ currencyLabel }) {
  const { isLoading: personLoading, person, token } = useAuth()
  const {
    contracts,
    isLoading: contractsLoading,
    error: contractsError,
  } = useContracts(token)

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  if (contractsLoading) {
    return <JustOneSecond title="Loading contracts..." />
  }

  if (contractsError) {
    return (
      <ErrorWrapper header="Unable to load contracts" error={contractsError} />
    )
  }

  return (
    <Card.Group>
      {contracts.map((contract) => (
        <ContractListItem
          key={contract.id}
          contract={contract}
          person={person}
          currencyLabel={currencyLabel}
        />
      ))}
    </Card.Group>
  )
}
