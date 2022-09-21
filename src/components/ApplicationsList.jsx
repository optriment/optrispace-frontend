import React from 'react'
import { Card } from 'semantic-ui-react'
import ApplicationListItem from './ApplicationListItem'

export default function ApplicationsList({
  applications,
  person,
  tokenSymbol,
}) {
  return (
    <Card.Group>
      {applications.map((application) => (
        <ApplicationListItem
          key={application.id}
          application={application}
          person={person}
          tokenSymbol={tokenSymbol}
        />
      ))}
    </Card.Group>
  )
}
