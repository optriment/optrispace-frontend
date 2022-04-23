import React from 'react'
import { Card, Icon, List } from 'semantic-ui-react'
import Link from 'next/link'
import { formatDateTime } from '../lib/formatDate'

export default function JobListItem({ job, isOwner }) {
  const formattedDate = formatDateTime(job.updated_at)

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {isOwner && <Icon name="heart" color="red" title="Created by me" />}

          <Link href="/jobs/[id]" as={`/jobs/${job.id}`}>
            <a>{job.title}</a>
          </Link>
        </Card.Header>

        <Card.Description>
          {job.description.split('\n').map((str, idx) => (
            <p key={idx}>{str}</p>
          ))}
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <List horizontal relaxed>
          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name="user" /> {job.applications_count}
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name="money" /> {job.budget} COIN
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name="clock" /> {formattedDate}
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  )
}
