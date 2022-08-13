import React from 'react'
import Link from 'next/link'
import { Button, Item } from 'semantic-ui-react'
import { FormattedDescription } from '../FormattedDescription'

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
            <Button as="a" content="Hire" primary size="tiny" floated="right" />
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

        <Item.Description>
          <FormattedDescription description={application.comment} />
        </Item.Description>
      </Item.Content>
    </Item>
  )
}
