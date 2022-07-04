import React from 'react'
import { Button, Item } from 'semantic-ui-react'
import Link from 'next/link'

export default function ApplicationListItem({ job, application }) {
  const { applicant, contract } = application

  return (
    <Item>
      <Item.Image
        size="tiny"
        avatar
        src="https://react.semantic-ui.com/images/avatar/large/justen.jpg"
      />

      <Item.Content>
        {contract ? (
          <Link
            href="/contracts/[id]"
            as={`/contracts/${contract.id}`}
            passHref
          >
            <Button primary floated="right">
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
            <Button color="green" floated="right">
              Make a job offer
            </Button>
          </Link>
        )}

        <Item.Header>{applicant?.display_name || applicant.login}</Item.Header>

        <Item.Meta>
          {application.price && (
            <span className="price">{application.price} ALZ</span>
          )}
        </Item.Meta>

        <Item.Description>{application.comment}</Item.Description>
      </Item.Content>
    </Item>
  )
}
