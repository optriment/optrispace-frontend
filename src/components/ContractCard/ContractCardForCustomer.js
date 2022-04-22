import {
  Button,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

import Link from 'next/link';

export default function ContractCardForCustomer({ contract }) {
  return (
    <>
      <Grid.Row>
        <Grid.Column>
          <Segment clearing padded>
            <Link href="/contracts/[id]/edit" as={`/contracts/${contract.id}/edit`} passHref>
              <Button content='Редактировать' floated='right' size='tiny' labelPosition='left' icon='pencil' />
            </Link>

            <Header floated='left' as='h1' style={{ fontSize: '2em' }}>
              {contract.title}
            </Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Segment padded>
            {contract.description.split('\n').map((str, idx) => <p key={idx}>{str}</p>)}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </>
  )
}
