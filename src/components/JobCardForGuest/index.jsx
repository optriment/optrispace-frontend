import React from 'react'
import { Segment, Header, Grid } from 'semantic-ui-react'
import Link from 'next/link'
import { JobCardHeader } from '../JobCardHeader'

export const JobCardForGuest = ({
  job,
  coinSymbol,
  blockchainViewAddressURL,
}) => {
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
          <Header as="h3">Leave a Reply</Header>

          <p>
            Please
            <Link href="/sign_up" passHref>
              <a> sign up </a>
            </Link>
            or
            <Link href="/sign_in" passHref>
              <a> log in</a>
            </Link>
            .
          </p>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}
