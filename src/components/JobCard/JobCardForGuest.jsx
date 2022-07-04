import React from 'react'
import { Grid, Segment, Header } from 'semantic-ui-react'
import Link from 'next/link'
import JobTitle from './JobTitle'
import JobBudget from './JobBudget'
import CustomerCard from './CustomerCard'
import JobDescription from './JobDescription'

export default function JobCardForGuest({ job }) {
  return (
    <Grid padded stackable>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Segment basic>
              <JobTitle title={job.title} />
              <JobBudget budget={job.budget} />
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Segment basic>
              <CustomerCard customer={job.customer} />
            </Segment>
            <Segment basic>
              <JobDescription description={job.description} />
            </Segment>
          </Segment>
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
