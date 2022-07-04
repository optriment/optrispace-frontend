import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import JobTitle from './JobTitle'
import JobBudget from './JobBudget'
import CustomerCard from './CustomerCard'
import JobDescription from './JobDescription'
import ApplicationForm from './ApplicationForm'

export default function JobCardForApplicant({ job }) {
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
              <ApplicationForm job={job} />
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
