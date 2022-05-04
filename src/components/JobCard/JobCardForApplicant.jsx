import React from 'react'

import { Grid } from 'semantic-ui-react'

import Statistics from './Statistics'
import TitleDescription from './TitleDescription'
import ApplicationForm from './ApplicationForm'

export default function JobCardForApplicant({ job }) {
  return (
    <Grid container stackable verticalAlign="top">
      <Grid.Row>
        <Grid.Column width={10}>
          <TitleDescription job={job} />
        </Grid.Column>

        <Grid.Column width={6}>
          <Statistics job={job} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <ApplicationForm job={job} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
