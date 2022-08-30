import React from 'react'
import { Container, Grid, Segment, Header } from 'semantic-ui-react'
import Link from 'next/link'
import { BudgetLabel } from '../BudgetLabel'
import { CustomerCard } from '../CustomerCard'
import { FormattedDescription } from '../FormattedDescription'
import { ShareButtons } from '../ShareButtons/ShareButtons'

export const JobCardForGuest = ({ job, currencyLabel, domain }) => {
  return (
    <Grid stackable>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Segment basic>
              <CustomerCard customer={job.customer} />
              <BudgetLabel value={job.budget} currencyLabel={currencyLabel} />
            </Segment>
            <Segment basic>
              <Container text fluid>
                <FormattedDescription description={job.description} />
              </Container>
            </Segment>
          </Segment>
          <ShareButtons domain={domain} job={job} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Segment basic>
              <Header as="h3">Leave a Reply</Header>

              <p>
                Please
                <Link href="/sign_up" passHref>
                  <a> sign up </a>
                </Link>
                or
                <Link href="/sign_in" passHref>
                  <a> log in </a>
                </Link>{' '}
                to access the OptriSpace.
              </p>
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
