import { Header, Segment } from 'semantic-ui-react'

const Statistics = ({ job }) => {
  return (
    <Segment.Group>
      <Segment padded>
        <Header as="h3">Customer</Header>

        {job.customer.display_name}
      </Segment>

      <Segment padded>
        <Header as="h3">Approx. budget</Header>

        {job.budget}
      </Segment>

      <Segment padded>
        <Header as="h3">Applications</Header>

        {job.applications_count}
      </Segment>
    </Segment.Group>
  )
}

export default Statistics
