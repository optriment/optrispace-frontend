import React from 'react'
import { Header, Container, Grid, Segment } from 'semantic-ui-react'
import { BudgetLabel } from '../BudgetLabel'
import { CustomerCard } from '../CustomerCard'
import { FormattedDescription } from '../FormattedDescription'
import { ApplicationForm } from '../../forms/ApplicationForm'
import { useApplications } from '../../hooks/useApplications'
import { useAuth } from '../../hooks'
import JustOneSecond from '../JustOneSecond'
import ErrorWrapper from '../ErrorWrapper'

export const JobCardForApplicant = ({ job, currencyLabel }) => {
  const { isLoading: personLoading, token } = useAuth()
  const {
    applications,
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useApplications(token, job.id)

  const application =
    applications && applications.length > 0 ? applications[0] : null

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
    <Grid stackable>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Segment basic>
              <CustomerCard customer={job.customer} />
              <BudgetLabel value={job.budget} currencyLabel={currencyLabel} />
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
          <Segment>
            <Segment basic>
              {application ? (
                <Header as="h3">Your reply has been published</Header>
              ) : (
                <Header as="h3">Leave a Reply</Header>
              )}

              <ApplicationForm
                job={job}
                application={application}
                token={token}
                currencyLabel={currencyLabel}
              />
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
