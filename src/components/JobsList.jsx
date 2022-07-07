import React from 'react'
import { Divider, Container, Header, Segment, Card } from 'semantic-ui-react'
import JobListItem from './JobListItem'
import isJobOwner from '../lib/job'
import JobsSubscriptionForm from '../forms/Marketing/JobsSubscriptionForm'

export default function JobsList({ jobs, person }) {
  const DISPLAY_SUBSCRIPTION_FORM_AFTER_LINE_NUMBER = 7

  return (
    <Card.Group>
      {jobs.map((job, idx) => {
        return (
          <>
            <JobListItem
              key={job.id}
              job={job}
              isOwner={isJobOwner(job, person)}
            />

            {idx + 1 === DISPLAY_SUBSCRIPTION_FORM_AFTER_LINE_NUMBER && (
              <Card fluid style={{ backgroundColor: 'orange' }}>
                <Card.Content textAlign="center">
                  <Segment padded="very">
                    <Header as="h2">No interesting vacancies for you?</Header>

                    <Divider />

                    <Container text fluid>
                      Simply fill out the form below and we will send you a
                      message when new vacancies will be posted.
                    </Container>

                    <Divider hidden />

                    <JobsSubscriptionForm />
                  </Segment>
                </Card.Content>
              </Card>
            )}
          </>
        )
      })}
    </Card.Group>
  )
}
