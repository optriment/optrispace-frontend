import React from 'react'
import Link from 'next/link'
import { Header, Divider, Label, Icon } from 'semantic-ui-react'
import { formatDate } from '../lib/formatDate'

export default function JobListItem({ job, coinSymbol }) {
  const createdAt = formatDate(job.created_at)

  return (
    <>
      <Header as="h3">
        <Link href={`/jobs/${job.id}`}>{job.title}</Link>
      </Header>

      <div style={{ wordWrap: 'break-word' }}>
        {job.description
          .trim()
          .split('\n')
          .map((str, idx) => {
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

      <Divider />

      {job.budget && job.budget > 0 && (
        <Label>
          <Icon name="money" /> {job.budget} {coinSymbol}
        </Label>
      )}

      {job.applications_count > 0 && (
        <Label>
          <Icon name="user" title="Applicants" /> {job.applications_count}
        </Label>
      )}

      <Label>
        <Icon name="clock" title="Created" /> {createdAt}
      </Label>
    </>
  )
}
