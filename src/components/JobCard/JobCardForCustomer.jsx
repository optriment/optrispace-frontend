import React from 'react'

import { Button, Grid, Divider } from 'semantic-ui-react'

import Link from 'next/link'

import Statistics from './Statistics'
import TitleDescription from './TitleDescription'
import Applications from './Applications'

export default function JobCardForCustomer({ job }) {
  return (
    <Grid container stackable verticalAlign="top">
      <Grid.Row>
        <Grid.Column width={10}>
          <TitleDescription job={job} />

          <Divider hidden />

          <Link href="/jobs/[id]/edit" as={`/jobs/${job.id}/edit`} passHref>
            <Button
              primary
              content="Edit"
              size="tiny"
              labelPosition="left"
              icon="pencil"
            />
          </Link>
        </Grid.Column>

        <Grid.Column width={6}>
          <Statistics job={job} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Applications job={job} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
