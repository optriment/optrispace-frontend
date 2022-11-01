import React from 'react'
import Link from 'next/link'
import {
  Icon,
  Step,
  Message,
  Container,
  Grid,
  Segment,
} from 'semantic-ui-react'
import { ApplicationForm } from '../../forms/ApplicationForm'
import { useAuth } from '../../hooks'
import { useApplicationChat } from '../../hooks/useApplicationChat'
import { useJobApplication } from '../../hooks/useJobApplication'
import { isEmptyString } from '../../lib/validators'
import { Chat } from '../Chat'
import ErrorWrapper from '../ErrorWrapper'
import { FormattedDescription } from '../FormattedDescription'
import { JobCardHeader } from '../JobCardHeader'
import JustOneSecond from '../JustOneSecond'
import { ProfileIsNotConfigured } from '../ProfileIsNotConfigured'
import { ShareButtons } from '../ShareButtons/ShareButtons'

export const JobCardForApplicant = ({
  job,
  person,
  coinSymbol,
  domain,
  blockchainViewAddressURL,
}) => {
  const { isLoading: personLoading, token } = useAuth()
  const {
    application,
    isLoading: applicationLoading,
    error: applicationError,
  } = useJobApplication(token, job?.id)

  const { chat } = useApplicationChat(token, application?.id)

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  if (applicationLoading) {
    return <JustOneSecond title="Loading application..." />
  }

  if (applicationError) {
    return (
      <ErrorWrapper
        header="Unable to load application"
        error={applicationError}
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
              <JobCardHeader
                job={job}
                coinSymbol={coinSymbol}
                blockchainViewAddressURL={blockchainViewAddressURL}
              />
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
          <Step.Group widths={2} attached="bottom">
            <Step completed={!!application?.id} active={!application.id}>
              <Icon name="write" />
              <Step.Content>
                <Step.Title>Leave a reply</Step.Title>
              </Step.Content>
            </Step>
            <Step disabled={!application?.id} active={!!application?.id}>
              <Icon name="chat" />
              <Step.Content>
                <Step.Title>Chat with customer</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>

          <Segment attached>
            <Segment basic>
              {application?.id ? (
                <>
                  {isEmptyString(application?.contract_id) ? (
                    <Message>
                      <Message.Header>
                        You&apos;ve applied with the service price of
                        {' ' + application.price + ' ' + coinSymbol}
                      </Message.Header>
                    </Message>
                  ) : (
                    <Message positive>
                      <Message.Header>You have a contract</Message.Header>
                      <p>
                        <Link
                          href="/contracts/[id]"
                          as={`/contracts/${application.contract_id}`}
                          passHref
                        >
                          <a>Click here to open contract</a>
                        </Link>
                      </p>
                    </Message>
                  )}

                  {chat?.id && <Chat chatId={chat.id} token={token} />}
                </>
              ) : (
                <>
                  {job.is_suspended ? (
                    <Message
                      icon="pause"
                      header="This job does not accept new applications"
                      content="The customer has temporarily suspended accepting applications for this job"
                    />
                  ) : (
                    <>
                      {personHasAddress ? (
                        <ApplicationForm
                          job={job}
                          token={token}
                          coinSymbol={coinSymbol}
                        />
                      ) : (
                        <ProfileIsNotConfigured />
                      )}
                    </>
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
