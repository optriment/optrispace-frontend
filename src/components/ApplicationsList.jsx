import React from 'react'
import { Card } from 'semantic-ui-react'
import { useAuth } from '../hooks'
import { useMyApplications } from '../hooks/useMyApplications'
import ApplicationListItem from './ApplicationListItem'
import ErrorWrapper from './ErrorWrapper'
import JustOneSecond from './JustOneSecond'

export default function ApplicationsList({ currencyLabel }) {
  const { isLoading: personLoading, person, token } = useAuth()
  const {
    applications,
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useMyApplications(token)

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  if (applicationsLoading) {
    return <JustOneSecond title="Loading applications..." />
  }

  if (applicationsError) {
    return (
      <ErrorWrapper
        header="Unable to load applications"
        error={applicationsError}
      />
    )
  }

  return (
    <Card.Group>
      {applications.map((application) => (
        <ApplicationListItem
          key={application.id}
          application={application}
          person={person}
          currencyLabel={currencyLabel}
        />
      ))}
    </Card.Group>
  )
}
