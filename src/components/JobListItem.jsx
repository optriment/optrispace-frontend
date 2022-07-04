import React from 'react'
import { Button, Card, Icon, List } from 'semantic-ui-react'
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
          <div style={{ textAlign: 'justify' }}>
            {job.description.split('\n').map((str, idx) => {
              if (idx === 5) {
                return (
                  <p key={idx}>
                    <br />
                    <Link href="/jobs/[id]" as={`/jobs/${job.id}`}>
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
          {job.budget && job.budget > 0 && (
            <List.Item>
              <List.Content>
                <List.Header>
                  <List.Icon name="money" /> {job.budget} ALZ
                </List.Header>
              </List.Content>
            </List.Item>
          )}

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
                <List.Icon name="clock" title="Published at" /> {formattedDate}
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  )
}
