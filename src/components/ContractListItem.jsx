import React from 'react'
import { Button, Card, List } from 'semantic-ui-react'
import Link from 'next/link'
import { formatDateTime } from '../lib/formatDate'

export default function ContractListItem({ person, contract, tokenSymbol }) {
  const formattedDate = formatDateTime(contract.created_at)

  let statusIcon = 'hourglass'

  switch (contract.status) {
    case 'signed':
      statusIcon = 'hourglass outline'
      break
    case 'funded':
      statusIcon = 'hourglass start'
      break
    case 'approved':
      statusIcon = 'hourglass half'
      break
    case 'completed':
      statusIcon = 'hourglass end'
      break
  }

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <Link
            href="/contracts/[id]"
            as={`/contracts/${contract.id}`}
            passHref
          >
            <a>{contract.title}</a>
          </Link>
        </Card.Header>

        <Card.Description>
          <div style={{ textAlign: 'justify' }}>
            {contract.description
              .trim()
              .split('\n')
              .map((str, idx) => {
                if (idx === 5) {
                  return (
                    <p key={idx}>
                      <br />
                      <Link
                        href="/contracts/[id]"
                        as={`/contracts/${contract.id}`}
                        passHref
                      >
                        <a>
                          <Button size="tiny">Read more</Button>
                        </a>
                      </Link>
                    </p>
                  )
                }

                if (idx < 5) {
                  return (
                    <div key={idx}>
                      {str}

                      <br />
                    </div>
                  )
                }
              })}
          </div>
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <List horizontal relaxed>
          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name="user" /> Customer:{' '}
                {person && contract.customer_id === person.id
                  ? 'Me'
                  : contract.customer_display_name}
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name="user" /> Contractor:{' '}
                {person && contract.performer_id === person.id
                  ? 'Me'
                  : contract.performer_display_name}
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name="money" /> {contract.price} {tokenSymbol}
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name="time" /> {formattedDate}
              </List.Header>
            </List.Content>
          </List.Item>
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
