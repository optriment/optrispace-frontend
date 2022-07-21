import React from 'react'
import { Container, Segment, Button, Grid } from 'semantic-ui-react'
import Link from 'next/link'
import { BudgetLabel } from '../BudgetLabel'
import { CustomerCard } from '../CustomerCard'
import { FormattedDescription } from '../FormattedDescription'
import Applications from './Applications'
import { useApplications } from '../../hooks/useApplications'
import { useAuth } from '../../hooks'
import JustOneSecond from '../JustOneSecond'
import ErrorWrapper from '../ErrorWrapper'
import isJobOwner from '../../lib/job'

export const JobCardForCustomer = ({ job }) => {
  const { isLoading: personLoading, token, person } = useAuth()
  const {
    applications,
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useApplications(token, job.id)

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  if (!isJobOwner(job, person)) {
    return <ErrorWrapper header="You do not have access to this job" />
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
    <Grid stackable>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Segment basic>
              <CustomerCard customer={job.customer} />
              <BudgetLabel value={job.budget} />
            </Segment>
            <Segment basic>
              <Container text fluid>
                <FormattedDescription description={job.description} />
              </Container>
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Link href="/jobs/[id]/edit" as={`/jobs/${job.id}/edit`} passHref>
            <Button primary content="Edit" labelPosition="left" icon="pencil" />
          </Link>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          {job.applications_count > 0 && (
            <Applications job={job} applications={applications} />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
