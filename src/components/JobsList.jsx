import React from 'react'
import { Card } from 'semantic-ui-react'
import JobListItem from './JobListItem'
import isJobOwner from '../lib/job'

export default function JobsList({ jobs, person }) {
  return (
    <Card.Group>
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} isOwner={isJobOwner(job, person)} />
      ))}
    </Card.Group>
  )
}
