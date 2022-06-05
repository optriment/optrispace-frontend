import React from 'react'

import { Grid, Divider, Header } from 'semantic-ui-react'

import Link from 'next/link'
import Statistics from './Statistics'
import TitleDescription from './TitleDescription'

export default function JobCardForGuest({ job }) {
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

      <Divider />

      <Grid.Row>
        <Grid.Column>
          <Header as="h3">Apply to this job</Header>

          <p>
            You need to be
            <Link href="/sign_in" passHref>
              <a> registered </a>
            </Link>{' '}
            to access the OptriSpace
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
