import React from 'react'
import { Header, Grid } from 'semantic-ui-react'
import { JobCardForApplicant } from '../../../../components/JobCardForApplicant'
import { JobCardForCustomer } from '../../../../components/JobCardForCustomer'
import { JobCardForGuest } from '../../../../components/JobCardForGuest'
import { Sidebar } from '../../../../components/Sidebar'
import { useAuth } from '../../../../hooks'

const Wrapper = ({ title, children }) => {
  return (
    <>
      <Header as="h1">{title}</Header>

      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={11}>{children}</Grid.Column>
          <Grid.Column width={5}>
            <Sidebar />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export const JobScreen = ({ job }) => {
  const { isAuthenticated, person } = useAuth()

  if (!isAuthenticated) {
    return (
      <Wrapper title={job.title}>
        <JobCardForGuest job={job} />
      </Wrapper>
    )
  }

  return (
    <Wrapper title={job.title}>
      {job.created_by === person.id ? (
        <JobCardForCustomer job={job} />
      ) : (
        <JobCardForApplicant job={job} />
      )}
    </Wrapper>
  )
}
