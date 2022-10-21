import * as Sentry from '@sentry/nextjs'
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import Link from 'next/link'
import { Button, Segment, Divider, Header, Grid } from 'semantic-ui-react'
import { JobCardForApplicant } from '../../../../components/JobCardForApplicant'
import { JobCardForCustomer } from '../../../../components/JobCardForCustomer'
import { JobCardForGuest } from '../../../../components/JobCardForGuest'
import { Sidebar } from '../../../../components/Sidebar'
import { blockJob } from '../../../../lib/api'
import Web3Context from '../../../../context/web3-context'

const Wrapper = ({ jobId, token, title, children, isAdmin, isCustomer }) => {
  const router = useRouter()

  const handleBlockJob = async () => {
    if (!isAdmin) {
      return
    }

    if (!window.confirm('Are you sure?')) {
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

  return (
    <>
      <Header as="h1">{title}</Header>

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
      <Wrapper title={job.title}>
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
      jobId={job.id}
      title={job.title}
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
