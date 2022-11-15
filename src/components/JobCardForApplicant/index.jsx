import React from 'react'
import Link from 'next/link'
import { Segment, Header, Message, Grid } from 'semantic-ui-react'
import { ApplicationForm } from '../../forms/ApplicationForm'
import { useAuth } from '../../hooks'
import { useApplicationChat } from '../../hooks/useApplicationChat'
import { useJobApplication } from '../../hooks/useJobApplication'
import { isEmptyString } from '../../lib/validators'
import { Chat } from '../Chat'
import ErrorWrapper from '../ErrorWrapper'
import { JobCardHeader } from '../JobCardHeader'
import JustOneSecond from '../JustOneSecond'
import { ProfileIsNotConfigured } from '../ProfileIsNotConfigured'

export const JobCardForApplicant = ({
  job,
  person,
  coinSymbol,
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
    <Grid stackable columns={1}>
      <Grid.Column>
        <Segment>
          <JobCardHeader
            job={job}
            coinSymbol={coinSymbol}
            blockchainViewAddressURL={blockchainViewAddressURL}
          />
        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment>
          {application?.id ? (
            <>
              {isEmptyString(application?.contract_id) ? (
                <Message>
                  <Message.Header>
                    You&apos;ve applied with the service price of
                    {' ' + application.price + ' ' + coinSymbol}.
                  </Message.Header>

                  <Message.List>
                    <Message.Item>
                      The next step is to get a contract from the customer to do
                      this task and get paid.
                    </Message.Item>

                    <Message.Item>
                      You have to discuss terms and conditions and then prove,
                      that you are ready to work.
                    </Message.Item>

                    <Message.Item>
                      Pay attention and ask anything you need to finish this
                      task.
                    </Message.Item>

                    <Message.Item>
                      <b>
                        Please do not start working before getting funded
                        contract!
                      </b>
                    </Message.Item>
                  </Message.List>
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
                    <>
                      <Header as="h3">Application Form</Header>

                      <ApplicationForm
                        job={job}
                        token={token}
                        coinSymbol={coinSymbol}
                      />
                    </>
                  ) : (
                    <ProfileIsNotConfigured />
                  )}
                </>
              )}
            </>
          )}
        </Segment>
      </Grid.Column>
    </Grid>
  )
}
