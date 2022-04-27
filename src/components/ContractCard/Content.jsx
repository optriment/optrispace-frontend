import React from 'react'
import { Segment, Header } from 'semantic-ui-react'

export default function Content({ contract }) {
  return (
    <Segment padded>
      <Header as="h2">{contract.title}</Header>

      {contract.description.split('\n').map((str, idx) => (
        <p key={idx}>{str}</p>
      ))}
    </Segment>
  )
}
