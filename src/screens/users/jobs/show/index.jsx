import * as Sentry from '@sentry/nextjs'
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import { Button, Segment, Divider, Header, Grid } from 'semantic-ui-react'
import { JobCardForApplicant } from '../../../../components/JobCardForApplicant'
import { JobCardForCustomer } from '../../../../components/JobCardForCustomer'
import { JobCardForGuest } from '../../../../components/JobCardForGuest'
import { Sidebar } from '../../../../components/Sidebar'
import { blockJob } from '../../../../lib/api'
import Web3Context from '../../../../context/web3-context'

const Wrapper = ({ jobId, token, title, children, isAdmin }) => {
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

      {isAdmin && (
        <Grid.Row stackable>
          <Grid.Column>
            <Segment color="red">
              <Button negative content="Block" onClick={handleBlockJob} />
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
  tokenSymbol,
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
          tokenSymbol={tokenSymbol}
          domain={domain}
        />
      </Wrapper>
    )
  }

  return (
    <Wrapper
      token={token}
      jobId={job.id}
      title={job.title}
      isAdmin={person.is_admin}
    >
      {job.created_by === person.id ? (
        <JobCardForCustomer
          job={job}
          blockchainViewAddressURL={blockchainViewAddressURL}
          tokenSymbol={tokenSymbol}
          domain={domain}
        />
      ) : (
        <JobCardForApplicant
          job={job}
          blockchainViewAddressURL={blockchainViewAddressURL}
          person={person}
          tokenSymbol={tokenSymbol}
          domain={domain}
        />
      )}
    </Wrapper>
  )
}
