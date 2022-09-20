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
import { ShareButtons } from '../ShareButtons/ShareButtons'
import { isEmptyString } from '../../lib/validators'
import { ProfileIsNotConfigured } from '../ProfileIsNotConfigured'

export const JobCardForApplicant = ({ job, person, tokenSymbol, domain }) => {
  const { isLoading: personLoading, token } = useAuth()
  const {
    applications,
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useApplications(token, job.id)

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

  const application =
    applications && applications.length > 0 ? applications[0] : null

  return (
    <Grid stackable>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Segment basic>
              <CustomerCard customer={job.customer} />
              <BudgetLabel value={job.budget} tokenSymbol={tokenSymbol} />
            </Segment>
            <Segment basic>
              <Container text fluid>
                <FormattedDescription description={job.description} />
              </Container>
            </Segment>
          </Segment>
          <ShareButtons domain={domain} job={job} />
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

              {isEmptyString(person.ethereum_address) ? (
                <ProfileIsNotConfigured />
              ) : (
                <ApplicationForm
                  job={job}
                  application={application}
                  token={token}
                  tokenSymbol={tokenSymbol}
                />
              )}
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
