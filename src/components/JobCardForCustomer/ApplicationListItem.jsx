import React from 'react'
import Link from 'next/link'
import { Button, Item, Icon } from 'semantic-ui-react'
import { FormattedDescription } from '../FormattedDescription'
import { isEmptyString } from '../../lib/validators'

export default function ApplicationListItem({
  job,
  application,
  blockchainViewAddressURL,
  tokenSymbol,
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
              disabled={isEmptyString(applicant.ethereum_address)}
            />
          </Link>
        )}

        <Item.Header>
          {isEmptyString(applicant.display_name)
            ? applicant.login
            : applicant.display_name}

          {!isEmptyString(applicant.ethereum_address) && (
            <>
              {' '}
              <a
                href={`${blockchainViewAddressURL}/${applicant.ethereum_address}`}
                target="_blank"
                rel="noreferrer noopener nofollow"
                title="Open wallet information"
              >
                <Icon name="address card" />
              </a>
            </>
          )}
        </Item.Header>

        <Item.Meta>
          {application.price && (
            <span className="price">
              {application.price} {tokenSymbol}
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
