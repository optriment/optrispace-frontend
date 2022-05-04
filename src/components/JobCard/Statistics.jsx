import { Header, Segment } from 'semantic-ui-react'

const Statistics = ({ job }) => {
  return (
    <Segment.Group>
      <Segment padded>
        <Header as="h3">Заказчик</Header>

        {job.customer.display_name}
      </Segment>

      <Segment padded>
        <Header as="h3">Бюджет</Header>

        {job.budget}
      </Segment>

      <Segment padded>
        <Header as="h3">Заявок</Header>

        {job.applications_count}
      </Segment>

      <Segment padded>
        <Header as="h3">Длительность</Header>

        {job.duration}
      </Segment>
    </Segment.Group>
  )
}

export default Statistics
