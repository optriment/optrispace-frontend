import React from 'react'
import { Container, Segment, Button, Grid } from 'semantic-ui-react'
import Link from 'next/link'
import JobTitle from './JobTitle'
import JobBudget from './JobBudget'
import CustomerCard from './CustomerCard'
import JobDescription from './JobDescription'
import Applications from './Applications'

export default function JobCardForCustomer({ job }) {
  return (
    <Grid stackable>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Segment basic>
              <CustomerCard customer={job.customer} />
              <JobTitle title={job.title} />
              <JobBudget budget={job.budget} />
            </Segment>
            <Segment basic>
              <Container text fluid>
                <JobDescription description={job.description} />
              </Container>
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Link href="/jobs/[id]/edit" as={`/jobs/${job.id}/edit`} passHref>
            <Button primary content="Edit" labelPosition="left" icon="pencil" />
          </Link>
        </Grid.Column>
      </Grid.Row>

      {job.applications_count > 0 && (
        <Grid.Row>
          <Grid.Column>
            <Applications job={job} />
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  )
}
