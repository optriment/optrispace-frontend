import React from 'react'
import { Grid } from 'semantic-ui-react'

import ContractCardForCustomer from './ContractCardForCustomer'
import ContractCardForPerformer from './ContractCardForPerformer'

export default function ContractCard({ contract, person, token }) {
  const isCustomer = contract.customer.id === person.id

  return (
    <Grid container stackable verticalAlign="top">
      {isCustomer ? (
        <ContractCardForCustomer contract={contract} token={token} />
      ) : (
        <ContractCardForPerformer contract={contract} token={token} />
      )}
    </Grid>
  )
}
