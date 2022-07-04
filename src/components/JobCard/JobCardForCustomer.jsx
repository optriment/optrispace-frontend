import React from 'react'
import { Segment, Button, Grid } from 'semantic-ui-react'
import Link from 'next/link'
import JobTitle from './JobTitle'
import JobBudget from './JobBudget'
import CustomerCard from './CustomerCard'
import JobDescription from './JobDescription'
import Applications from './Applications'

export default function JobCardForCustomer({ job }) {
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
        <Grid.Column textAlign="right">
          <Link href="/jobs/[id]/edit" as={`/jobs/${job.id}/edit`} passHref>
            <Button primary content="Edit" labelPosition="left" icon="pencil" />
          </Link>
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
