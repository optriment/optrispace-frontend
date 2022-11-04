import React from 'react'
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
  if (isEmptyString(person.ethereum_address)) {
    return <ProfileIsNotConfigured />
  }

  if (contract.customer_id === person.id) {
    return (
      <ContractCardForCustomer
        contract={contract}
        person={person}
        token={token}
        coinSymbol={coinSymbol}
        chat={chat}
      />
    )
  }

  return (
    <ContractCardForContractor
      contract={contract}
      person={person}
      token={token}
      coinSymbol={coinSymbol}
      chat={chat}
    />
  )
}
