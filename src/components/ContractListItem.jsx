import React from 'react'
import { Card, List } from 'semantic-ui-react'
import Link from 'next/link'

export default function ContractListItem({ person, contract }) {
  let statusIcon = 'hourglass'

  switch (contract.status) {
    case 'created':
      statusIcon = 'hourglass outline'
      break
    case 'accepted':
      statusIcon = 'hourglass start'
      break
    case 'sent':
      statusIcon = 'hourglass half'
      break
    case 'approved':
      statusIcon = 'hourglass end'
      break
  }

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <Link href="/contracts/[id]" as={`/contracts/${contract.id}`}>
            <a>{contract.title}</a>
          </Link>
        </Card.Header>

        <Card.Description>
          {contract.description.split('\n').map((str, idx) => (
            <p key={idx}>{str}</p>
          ))}
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <List horizontal relaxed>
          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name="user" /> Customer:{' '}
                {person && contract.customer.id === person.id
                  ? 'Me'
                  : contract.customer.id}
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name="user" /> Performer:{' '}
                {person && contract.performer.id === person.id
                  ? 'Me'
                  : contract.performer.id}
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name="money" /> {contract.price}
              </List.Header>
            </List.Content>
          </List.Item>
          {contract.duration && (
            <List.Item>
              <List.Content>
                <List.Header>
                  <List.Icon name="clock" /> {contract.duration} days
                </List.Header>
              </List.Content>
            </List.Item>
          )}
          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name={statusIcon} /> {contract.status}
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  )
}
