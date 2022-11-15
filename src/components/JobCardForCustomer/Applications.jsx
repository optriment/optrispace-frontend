import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import ApplicationListItem from './ApplicationListItem'

const Applications = ({
  job,
  applications,
  blockchainViewAddressURL,
  coinSymbol,
}) => {
  return (
    <Grid stackable columns={1}>
      {applications.map((application) => {
        return (
          <Grid.Column key={application.id}>
            <Segment>
              <ApplicationListItem
                key={application.id}
                job={job}
                application={application}
                blockchainViewAddressURL={blockchainViewAddressURL}
                coinSymbol={coinSymbol}
              />
            </Segment>
          </Grid.Column>
        )
      })}
    </Grid>
  )
}

export default Applications
