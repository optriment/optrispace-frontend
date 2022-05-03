import { Container, Header } from 'semantic-ui-react'

const TitleDescription = ({ job }) => {
  return (
    <Container text textAlign="justified" fluid>
      <Header as="h2">{job.title}</Header>

      {job.description.split('\n').map((str, idx) => (
        <p key={idx}>{str}</p>
      ))}
    </Container>
  )
}

export default TitleDescription
