import React from 'react'
import { Container, Grid, Segment } from 'semantic-ui-react'
import JobTitle from './JobTitle'
import JobBudget from './JobBudget'
import CustomerCard from './CustomerCard'
import JobDescription from './JobDescription'
import ApplicationForm from './ApplicationForm'

export default function JobCardForApplicant({ job }) {
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
