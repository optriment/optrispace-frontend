import React from 'react'
import { Button, Card, List } from 'semantic-ui-react'
import Link from 'next/link'
import { formatDateTime } from '../lib/formatDate'

export default function JobListItem({ job, tokenSymbol }) {
  const formattedDate = formatDateTime(job.created_at)

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <Link href="/jobs/[id]" as={`/jobs/${job.id}`}>
            <a>{job.title}</a>
          </Link>
        </Card.Header>

        <Card.Description>
          <div style={{ textAlign: 'justify' }}>
            {job.description
              .trim()
              .split('\n')
              .map((str, idx) => {
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
                  <List.Icon name="money" title="Budget" />
                  {job.budget} {tokenSymbol}
                </List.Header>
              </List.Content>
            </List.Item>
          )}

          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name="user" title="Applicants" />{' '}
                {job.applications_count}
              </List.Header>
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content>
              <List.Header>
                <List.Icon name="clock" title="Publication date" />{' '}
                {formattedDate}
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  )
}
