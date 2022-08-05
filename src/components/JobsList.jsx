import React, { Fragment } from 'react'
import { Divider, Container, Header, Segment, Card } from 'semantic-ui-react'
import JobListItem from './JobListItem'
import isJobOwner from '../lib/job'
import { JobsSubscriptionForm } from '../forms/Marketing/JobsSubscriptionForm'
import JustOneSecond from './JustOneSecond'
import ErrorWrapper from './ErrorWrapper'
import { useAuth } from '../hooks'
import { useJobs } from '../hooks/useJobs'

export default function JobsList({ currencyLabel }) {
  const DISPLAY_SUBSCRIPTION_FORM_AFTER_LINE_NUMBER = 7

  const { person } = useAuth()
  const { jobs, isLoading: jobsLoading, error: jobsError } = useJobs()

  if (jobsLoading) {
    return <JustOneSecond title="Loading jobs..." />
  }

  if (jobsError) {
    return <ErrorWrapper header="Unable to load jobs" error={jobsError} />
  }

  return (
    <Card.Group>
      {jobs.map((job, idx) => {
        return (
          <Fragment key={job.id}>
            <JobListItem
              job={job}
              isOwner={isJobOwner(job, person)}
              currencyLabel={currencyLabel}
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
          </Fragment>
        )
      })}
    </Card.Group>
  )
}
