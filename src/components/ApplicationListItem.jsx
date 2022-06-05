import React from 'react'
import { Card, List } from 'semantic-ui-react'
import Link from 'next/link'
import { formatDateTime } from '../lib/formatDate'
import { truncateString } from '../lib/helpers'

export default function ApplicationListItem({ application }) {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <Link href="/jobs/[id]" as={`/jobs/${application.job.id}`}>
            <a>{application.job.title}</a>
          </Link>
        </Card.Header>

        <Card.Description>
          {truncateString(application.job.description, 300)
            .split('\n')
            .map((str, idx) => (
              <p key={idx}>{str}</p>
            ))}
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <List horizontal relaxed>
          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name="money" /> {application.price}
              </List.Header>
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name="time" title="Creation date" />{' '}
                {formatDateTime(application.created_at)}
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  )
}
