import { Card, List } from 'semantic-ui-react';
import Link from 'next/link';

export default function JobListItem({ person, contract }) {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <Link href="/contracts/[id]" as={`/contracts/${contract.id}`}>
            <a>{contract.title}</a>
          </Link>
        </Card.Header>

        <Card.Description>
          {contract.description.split('\n').map((str, idx) => <p key={idx}>{str}</p>)}
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <List horizontal relaxed>
          <List.Item>
            <List.Content>
              <List.Header><List.Icon name='user' /> Customer: {contract.customer.id == person.id ? 'Me' : contract.customer.id}</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header><List.Icon name='user' /> Performer: {contract.performer.id === person.id ? 'Me' : contract.performer.id}</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header><List.Icon name='money' /> {contract.price}</List.Header>
            </List.Content>
          </List.Item>
          {contract.duration && (
            <List.Item>
              <List.Content>
                <List.Header><List.Icon name='clock' /> {contract.duration} days</List.Header>
              </List.Content>
            </List.Item>
          )}
        </List>
      </Card.Content>
    </Card>
  );
}
