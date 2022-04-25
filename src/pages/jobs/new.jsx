import React from 'react'
import { Segment, Message } from 'semantic-ui-react'

import { useFetchPerson } from '../../lib/person'
import NewJobForm from '../../components/NewJobForm'

export default function NewJobPage() {
  const { person, loading, error } = useFetchPerson()

  if (error) {
    return (
      <Message negative>
        <Message.Header>Unable to load person</Message.Header>
      </Message>
    )
  }

  if (loading) {
    return <div>Loading person...</div>
  }

  if (!person) {
    return (
      <Message negative>
        <Message.Header>You must be logged in to create a job</Message.Header>
      </Message>
    )
  }

  return (
    <Segment vertical>
      <NewJobForm person={person} />
    </Segment>
  )
}
