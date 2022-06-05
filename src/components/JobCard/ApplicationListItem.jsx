import React from 'react'
import { Button, Label, Item } from 'semantic-ui-react'
import Link from 'next/link'

export default function ApplicationListItem({ job, application }) {
  const { applicant, contract } = application

  return (
    <Item>
      <Item.Image
        size="tiny"
        src="https://react.semantic-ui.com/images/wireframe/image.png"
      />

      <Item.Content>
        {contract ? (
          <Link
            href="/contracts/[id]"
            as={`/contracts/${contract.id}`}
            passHref
          >
            <Button primary size="tiny" floated="right">
              Open contract
            </Button>
          </Link>
        ) : (
          <Link
            href={{
              pathname: `/jobs/${job.id}/contracts/new`,
              query: { application_id: application.id },
            }}
            passHref
          >
            <Button color="green" size="tiny" floated="right">
              Make a job offer
            </Button>
          </Link>
        )}
        <Item.Header>{applicant?.display_name || applicant.login}</Item.Header>
        <Item.Description>{application.comment}</Item.Description>
        <Item.Extra>
          {application.price && <Label>Price: {application.price} ALZ</Label>}
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}
