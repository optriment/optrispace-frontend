import React from 'react'

import isJobOwner from '../../lib/job'
import { useAuth } from '../../hooks'

import JobCardForCustomer from './JobCardForCustomer'
import JobCardForApplicant from './JobCardForApplicant'
import JobCardForGuest from './JobCardForGuest'

export default function JobCard({ job }) {
  const { person } = useAuth()

  const isOwner = person && isJobOwner(job, person)
  const isApplicant = person && !isOwner

  if (isOwner) {
    return <JobCardForCustomer job={job} />
  }

  if (isApplicant) {
    return <JobCardForApplicant job={job} />
  }

  return <JobCardForGuest job={job} />
}
