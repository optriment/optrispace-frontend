import React from 'react'
import { ContractCardForCustomer } from '../../../../components/ContractCardForCustomer'
import { ContractCardForPerformer } from '../../../../components/ContractCardForPerformer'
import JustOneSecond from '../../../../components/JustOneSecond'
import { useAuth } from '../../../../hooks'

export const ContractScreen = ({ contract }) => {
  const { isLoading: personLoading, person, token } = useAuth()

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  if (contract.customer.id === person.id) {
    return (
      <ContractCardForCustomer
        contract={contract}
        person={person}
        token={token}
      />
    )
  }

  return (
    <ContractCardForPerformer
      contract={contract}
      person={person}
      token={token}
    />
  )
}
