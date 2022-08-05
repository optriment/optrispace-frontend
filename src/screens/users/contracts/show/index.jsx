import React, { useContext } from 'react'
import { ContractCardForCustomer } from '../../../../components/ContractCardForCustomer'
import { ContractCardForPerformer } from '../../../../components/ContractCardForPerformer'
import JustOneSecond from '../../../../components/JustOneSecond'
import Web3Context from '../../../../context/web3-context'
import { useAuth } from '../../../../hooks'

export const ContractScreen = ({ contract }) => {
  const { isLoading: personLoading, person, token } = useAuth()
  const { tokenSymbol } = useContext(Web3Context)

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  if (contract.customer.id === person.id) {
    return (
      <ContractCardForCustomer
        contract={contract}
        person={person}
        token={token}
        currencyLabel={tokenSymbol}
      />
    )
  }

  return (
    <ContractCardForPerformer
      contract={contract}
      person={person}
      token={token}
      currencyLabel={tokenSymbol}
    />
  )
}
