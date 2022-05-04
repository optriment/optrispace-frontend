import React from 'react'

import ContractCardForCustomer from './ContractCardForCustomer'
import ContractCardForPerformer from './ContractCardForPerformer'

export default function ContractCard({ contract, person, token }) {
  const isCustomer = contract.customer.id === person.id

  if (isCustomer) {
    return <ContractCardForCustomer contract={contract} token={token} />
  }

  return <ContractCardForPerformer contract={contract} token={token} />
}
