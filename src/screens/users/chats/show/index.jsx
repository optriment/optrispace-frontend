import Link from 'next/link'
import React from 'react'
import { Grid, List, Header, Segment } from 'semantic-ui-react'
import { Chat } from '../../../../components/Chat'
import ErrorWrapper from '../../../../components/ErrorWrapper'
import JustOneSecond from '../../../../components/JustOneSecond'
import { useApplication } from '../../../../hooks/useApplication'
import { formatDateTime } from '../../../../lib/formatDate'

export const ChatScreen = ({ chat, token, coinSymbol }) => {
  const createdAt = formatDateTime(chat.created_at)
  const parts = chat.topic.split(':')
  const resourceId = parts[2]

  const {
    application,
    isLoading: applicationLoading,
    error: applicationError,
  } = useApplication(token, resourceId)

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

  return (
    <Grid stackable columns={1}>
      <Grid.Column textAlign="center">
        <Header as="h2">
          <Link href={`/jobs/${application.job_id}`}>
            {application.job_title}
          </Link>
        </Header>
      </Grid.Column>

      <Grid.Column>
        <Grid stackable>
          <Grid.Column width={10}>
            <Segment>
              <Chat chatId={chat.id} token={token} />
            </Segment>
          </Grid.Column>

          <Grid.Column width={6}>
            <Segment>
              <Header as="h3" content="Information" />

              <List divided relaxed>
                <List.Item>
                  <b>Chat started:</b> {createdAt}
                </List.Item>
                <List.Item>
                  <b>Job budget:</b> {application.job_budget + ' ' + coinSymbol}
                </List.Item>
                <List.Item>
                  <b>Applicant&apos;s price:</b>
                  {' ' + application.price + ' ' + coinSymbol}
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid>
  )
}
