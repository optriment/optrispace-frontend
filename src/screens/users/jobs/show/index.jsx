import * as Sentry from '@sentry/nextjs'
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import Link from 'next/link'
import {
  Message,
  Button,
  Segment,
  Divider,
  Header,
  Grid,
} from 'semantic-ui-react'
import { JobCardForApplicant } from '../../../../components/JobCardForApplicant'
import { JobCardForCustomer } from '../../../../components/JobCardForCustomer'
import { JobCardForGuest } from '../../../../components/JobCardForGuest'
import { Sidebar } from '../../../../components/Sidebar'
import { blockJob, suspendJob } from '../../../../lib/api'
import Web3Context from '../../../../context/web3-context'

const Wrapper = ({ job, token, children, isAdmin, isCustomer }) => {
  const router = useRouter()

  const { id: jobId, title } = job

  const handleBlockJob = async () => {
    if (!isAdmin) {
      return
    }

    if (!window.confirm('Are you sure you want to block this job?')) {
      return
    }

    try {
      await blockJob(token, jobId)

      router.replace(`/jobs`)
    } catch (err) {
      Sentry.captureException(err)
      console.error({ err })
    }
  }

  const handleSuspendJob = async () => {
    if (!isCustomer) {
      return
    }

    if (
      !window.confirm('Are you sure you want to stop receiving applications?')
    ) {
      return
    }

    try {
      await suspendJob(token, jobId)

      router.reload()
    } catch (err) {
      Sentry.captureException(err)
      console.error({ err })
    }
  }

  return (
    <>
      <Header as="h1">{title}</Header>

      {isCustomer && job.is_suspended && (
        <Message
          icon="exclamation"
          header="You have suspended the acceptance of applications for this job"
          content="Use a button below to continue receiving applications from freelancers"
        />
      )}

      {(isAdmin || isCustomer) && (
        <Grid.Row stackable>
          <Grid.Column>
            <Segment color="red" clearing>
              {isAdmin && (
                <Button
                  floated="right"
                  negative
                  content="Block"
                  icon="remove"
                  labelPosition="left"
                  onClick={handleBlockJob}
                />
              )}

              {isCustomer && (
                <>
                  <Link
                    href="/jobs/[id]/edit"
                    as={`/jobs/${jobId}/edit`}
                    title="Edit"
                    passHref
                  >
                    <Button
                      color="teal"
                      floated="left"
                      icon="pencil"
                      content="Edit"
                      labelPosition="left"
                    />
                  </Link>

                  {!job.is_suspended && (
                    <Button
                      floated="left"
                      icon="pause"
                      content="Suspend"
                      labelPosition="left"
                      onClick={handleSuspendJob}
                    />
                  )}
                </>
              )}
            </Segment>

            <Divider hidden />
          </Grid.Column>
        </Grid.Row>
      )}

      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={11}>{children}</Grid.Column>
          <Grid.Column width={5}>
            <Sidebar />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export const JobScreen = ({
  job,
  isAuthenticated,
  person,
  token,
  coinSymbol,
}) => {
  const { publicRuntimeConfig } = getConfig()
  const domain = publicRuntimeConfig.domain

  const { blockchainViewAddressURL } = useContext(Web3Context)

  if (!isAuthenticated) {
    return (
      <Wrapper job={job}>
        <JobCardForGuest
          job={job}
          blockchainViewAddressURL={blockchainViewAddressURL}
          coinSymbol={coinSymbol}
          domain={domain}
        />
      </Wrapper>
    )
  }

  const isMyJob = job.created_by === person.id

  return (
    <Wrapper
      token={token}
      job={job}
      isAdmin={person.is_admin}
      isCustomer={isMyJob}
    >
      {isMyJob ? (
        <JobCardForCustomer
          job={job}
          blockchainViewAddressURL={blockchainViewAddressURL}
          coinSymbol={coinSymbol}
          domain={domain}
        />
      ) : (
        <JobCardForApplicant
          job={job}
          blockchainViewAddressURL={blockchainViewAddressURL}
          person={person}
          coinSymbol={coinSymbol}
          domain={domain}
        />
      )}
    </Wrapper>
  )
}
