import React from 'react'
import { Header, Segment, Grid } from 'semantic-ui-react'
import { JobCardHeader } from '../JobCardHeader'
import Applications from './Applications'
import { useJobApplications } from '../../hooks/useJobApplications'
import { useAuth } from '../../hooks'
import JustOneSecond from '../JustOneSecond'
import ErrorWrapper from '../ErrorWrapper'
import isJobOwner from '../../lib/job'

export const JobCardForCustomer = ({
  job,
  coinSymbol,
  blockchainViewAddressURL,
}) => {
  const { isLoading: personLoading, token, person } = useAuth()
  const {
    applications,
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useJobApplications(token, job.id)

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  if (!isJobOwner(job, person)) {
    return <ErrorWrapper header="You do not have access to this job" />
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

      {job.applications_count > 0 && (
        <Grid.Column>
          <Segment>
            <Header as="h3">{`Applications (${job.applications_count})`}</Header>

            <Applications
              job={job}
              applications={applications}
              blockchainViewAddressURL={blockchainViewAddressURL}
              coinSymbol={coinSymbol}
            />
          </Segment>
        </Grid.Column>
      )}
    </Grid>
  )
}
