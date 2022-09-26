import React from 'react'
import { Container, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { ApplicationForm } from '../../forms/ApplicationForm'
import { useAuth } from '../../hooks'
import { useApplicationChat } from '../../hooks/useApplicationChat'
import { useApplications } from '../../hooks/useApplications'
import { isEmptyString } from '../../lib/validators'
import { Chat } from '../Chat'
import ErrorWrapper from '../ErrorWrapper'
import { FormattedDescription } from '../FormattedDescription'
import { JobCardHeader } from '../JobCardHeader'
import JustOneSecond from '../JustOneSecond'
import { ProfileIsNotConfigured } from '../ProfileIsNotConfigured'
import { ShareButtons } from '../ShareButtons/ShareButtons'

export const JobCardForApplicant = ({ job, person, tokenSymbol, domain }) => {
  const { isLoading: personLoading, token } = useAuth()
  const {
    applications,
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useApplications(token, job.id)

  const application =
    applications && applications.length > 0 ? applications[0] : null

  const { chat } = useApplicationChat(token, application?.id)

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

  const personHasAddress = !isEmptyString(person.ethereum_address)

  const applicationForm = () => {
    return (
      <ApplicationForm
        job={job}
        application={application}
        token={token}
        tokenSymbol={tokenSymbol}
      />
    )
  }

  const chatForm = () => {
    return <Chat title="Conversation" chatId={chat?.id} token={token} />
  }

  const printBalance = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        Application price is{' '}
        <b>
          <Icon name="money" /> {application?.price} {tokenSymbol}
        </b>
      </div>
    )
  }

  return (
    <Grid stackable>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Segment basic>
              <JobCardHeader job={job} tokenSymbol={tokenSymbol} />
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
              {!application && <Header as="h3">Leave a Reply</Header>}

              {!personHasAddress && <ProfileIsNotConfigured />}

              {personHasAddress && !chat && applicationForm()}
              {personHasAddress && application && printBalance()}
              {personHasAddress && chat && chatForm()}
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
