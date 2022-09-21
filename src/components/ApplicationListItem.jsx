import React from 'react'
import { Button, Card, List } from 'semantic-ui-react'
import Link from 'next/link'
import { formatDateTime } from '../lib/formatDate'

export default function ApplicationListItem({ application, tokenSymbol }) {
  const formattedDate = formatDateTime(application.created_at)

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <Link href="/jobs/[id]" as={`/jobs/${application.job.id}`}>
            <a>{application.job.title}</a>
          </Link>
        </Card.Header>

        <Card.Description>
          <div style={{ textAlign: 'justify' }}>
            {application.job.description
              .trim()
              .split('\n')
              .map((str, idx) => {
                if (idx === 5) {
                  return (
                    <p key={idx}>
                      <br />
                      <Link
                        href="/jobs/[id]"
                        as={`/jobs/${application.job.id}`}
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
                <List.Icon name="money" /> {application.price} {tokenSymbol}
              </List.Header>
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name="clock" title="Created at" /> {formattedDate}
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  )
}
