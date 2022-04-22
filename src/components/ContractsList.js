import { Card } from 'semantic-ui-react';
import ContractListItem from './ContractListItem';
import { useFetchPerson } from '../lib/person';

export default function ContractsList({ contracts }) {
  const { person } = useFetchPerson();

  return (
    <Card.Group>
      {contracts.map(contract => (
        <ContractListItem
          key={contract.id}
          contract={contract}
          person={person}
        />
      ))}
    </Card.Group>
  );
}
