import { Grid } from 'semantic-ui-react';

import ContractCardForCustomer from './ContractCardForCustomer';
import ContractCardForPerformer from './ContractCardForPerformer';

export default function ContractCard({ contract, person }) {
  const isCustomer = contract.customer.id === person.id;
  const isPerformer = !isCustomer;

  return (
    <Grid container stackable verticalAlign='middle'>
      {isCustomer
        ? (<ContractCardForCustomer contract={contract} person={person} />)
        : (<ContractCardForPerformer contract={contract} person={person} />)
      }
    </Grid>
  )
}
