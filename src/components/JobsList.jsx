import React from 'react'
import { Card } from 'semantic-ui-react'
import JobListItem from './JobListItem'
import { useFetchPerson } from '../lib/person'
import isJobOwner from '../lib/job'

export default function JobsList({ jobs }) {
  const { person } = useFetchPerson()

  return (
    <Card.Group>
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} isOwner={isJobOwner(job, person)} />
      ))}
    </Card.Group>
  )
}
