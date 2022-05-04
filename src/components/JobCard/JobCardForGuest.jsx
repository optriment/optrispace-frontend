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
          <Header as="h3">Оставить заявку ко проекту</Header>

          <p>
            Для отправки заявки на выполнение работы вам необходимо{' '}
            <Link href="/sign_in" passHref>
              <a>зарегистироваться</a>
            </Link>{' '}
            в системе Optrispace
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
