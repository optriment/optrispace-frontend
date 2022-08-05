import React from 'react'
import { Button, Item } from 'semantic-ui-react'
import Link from 'next/link'

export default function ApplicationListItem({
  job,
  application,
  currencyLabel,
}) {
  const { applicant, contract } = application

  return (
    <Item>
      <Item.Image size="tiny" avatar src="/default-userpic.jpg" />

      <Item.Content>
        {contract ? (
          <Link
            href="/contracts/[id]"
            as={`/contracts/${contract.id}`}
            passHref
          >
            <Button
              as="a"
              content="Open contract"
              primary
              size="tiny"
              floated="right"
            />
          </Link>
        ) : (
          <Link
            href={{
              pathname: `/jobs/${job.id}/contracts/new`,
              query: { application_id: application.id },
            }}
            passHref
          >
            <Button
              as="a"
              content="Hire"
              primary
              size="tiny"
              floated="right"
              icon="check"
            />
          </Link>
        )}

        <Item.Header>{applicant?.display_name || applicant.login}</Item.Header>

        <Item.Meta>
          {application.price && (
            <span className="price">
              {application.price} {currencyLabel}
            </span>
          )}
        </Item.Meta>

        <Item.Description>{application.comment}</Item.Description>
      </Item.Content>
    </Item>
  )
}
