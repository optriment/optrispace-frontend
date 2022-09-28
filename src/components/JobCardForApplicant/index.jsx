import React from 'react'
import { Message, Container, Grid, Header, Segment } from 'semantic-ui-react'
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
              {application ? (
                <>
                  <Message>
                    <Message.Header>
                      You&apos;ve applied with the service price of
                      {' ' + application.price + ' ' + tokenSymbol}
                    </Message.Header>
                  </Message>

                  {chat?.id && <Chat chatId={chat?.id} token={token} />}
                </>
              ) : (
                <>
                  <Header as="h3">Leave a Reply</Header>

                  {personHasAddress ? (
                    <ApplicationForm
                      job={job}
                      application={application}
                      token={token}
                      tokenSymbol={tokenSymbol}
                    />
                  ) : (
                    <ProfileIsNotConfigured />
                  )}
                </>
              )}
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
