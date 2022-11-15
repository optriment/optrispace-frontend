import React from 'react'
import { Segment, Grid } from 'semantic-ui-react'
import JobListItem from './JobListItem'

export default function JobsList({ jobs, coinSymbol }) {
  return (
    <Grid columns={1}>
      {jobs.map((job) => {
        return (
          <Grid.Column key={job.id}>
            <Segment>
              <JobListItem job={job} coinSymbol={coinSymbol} />
            </Segment>
          </Grid.Column>
        )
      })}
    </Grid>
  )
}
