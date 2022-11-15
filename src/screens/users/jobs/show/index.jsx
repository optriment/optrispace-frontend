import * as Sentry from '@sentry/nextjs'
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import Link from 'next/link'
import { Message, Button, Segment, Header, Grid } from 'semantic-ui-react'
import { JobCardForApplicant } from '../../../../components/JobCardForApplicant'
import { JobCardForCustomer } from '../../../../components/JobCardForCustomer'
import { JobCardForGuest } from '../../../../components/JobCardForGuest'
import { Sidebar } from '../../../../components/Sidebar'
import { blockJob, suspendJob, resumeJob } from '../../../../lib/api'
import Web3Context from '../../../../context/web3-context'

const Wrapper = ({ job, token, children, isAdmin, isCustomer, stats }) => {
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

    if (job.is_suspended) {
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

  const handleResumeJob = async () => {
    if (!isCustomer) {
      return
    }

    if (!job.is_suspended) {
      return
    }

    if (
      !window.confirm('Are you sure you want to resume receiving applications?')
    ) {
      return
    }

    try {
      await resumeJob(token, jobId)

      router.reload()
    } catch (err) {
      Sentry.captureException(err)
      console.error({ err })
    }
  }

  return (
    <Grid stackable columns={1}>
      <Grid.Column textAlign="center">
        <Header as="h1">{title}</Header>
      </Grid.Column>

      {isCustomer && job.is_suspended && (
        <Grid.Column>
          <Message
            icon="exclamation"
            header="You have suspended the acceptance of applications for this job"
            content="Use a button below to continue receiving applications from freelancers"
          />
        </Grid.Column>
      )}

      {isCustomer && (
        <Grid.Column>
          <Segment color="orange" clearing>
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

            {job.is_suspended ? (
              <Button
                floated="left"
                icon="play"
                content="Resume"
                labelPosition="left"
                onClick={handleResumeJob}
              />
            ) : (
              <Button
                floated="left"
                icon="pause"
                content="Suspend"
                labelPosition="left"
                onClick={handleSuspendJob}
              />
            )}
          </Segment>
        </Grid.Column>
      )}

      <Grid.Column>
        <Grid columns={2} stackable>
          <Grid.Column mobile={16} computer={11}>
            {children}
          </Grid.Column>

          <Grid.Column computer={5} only="computer">
            <Sidebar stats={stats} />
          </Grid.Column>
        </Grid>
      </Grid.Column>

      {isAdmin && (
        <Grid.Column>
          <Segment color="red" clearing>
            <Button
              floated="right"
              negative
              content="Block"
              icon="remove"
              labelPosition="left"
              onClick={handleBlockJob}
            />
          </Segment>
        </Grid.Column>
      )}
    </Grid>
  )
}

export const JobScreen = ({
  job,
  isAuthenticated,
  person,
  token,
  coinSymbol,
  stats,
}) => {
  const { publicRuntimeConfig } = getConfig()
  const domain = publicRuntimeConfig.domain

  const { blockchainViewAddressURL } = useContext(Web3Context)

  if (!isAuthenticated) {
    return (
      <Wrapper job={job} stats={stats}>
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
      stats={stats}
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
