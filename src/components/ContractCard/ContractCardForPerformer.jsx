import React from 'react'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

export default function ContractCardForPerformer({ contract }) {
  return (
    <>
      <Grid.Row>
        <Grid.Column>
          <Segment clearing padded>
            <Button
              content="Принять условия работы"
              floated="right"
              size="tiny"
              labelPosition="left"
              icon="check"
              primary
            />

            <Header floated="left" as="h1" style={{ fontSize: '2em' }}>
              {contract.title}
            </Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Segment padded>
            {contract.description.split('\n').map((str, idx) => (
              <p key={idx}>{str}</p>
            ))}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </>
  )
}
