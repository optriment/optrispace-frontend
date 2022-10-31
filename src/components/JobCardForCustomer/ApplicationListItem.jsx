import React from 'react'
import Link from 'next/link'
import { Button, List, Item, Icon } from 'semantic-ui-react'
import { FormattedDescription } from '../FormattedDescription'
import { isEmptyString } from '../../lib/validators'
import { useApplicationChat } from '../../hooks/useApplicationChat'
import { useAuth } from '../../hooks'
import { formatDateTime } from '../../lib/formatDate'

export default function ApplicationListItem({
  job,
  application,
  blockchainViewAddressURL,
  coinSymbol,
}) {
  const { token } = useAuth()
  const { chat } = useApplicationChat(token, application?.id)
  const createdAt = formatDateTime(application.created_at)

  return (
    <Item>
      <Item.Image size="tiny" avatar src="/default-userpic.jpg" />

      <Item.Content>
        {application.contract_id ? (
          <Link
            href="/contracts/[id]"
            as={`/contracts/${application.contract_id}`}
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
              disabled={isEmptyString(application.applicant_ethereum_address)}
            />
          </Link>
        )}
        {chat && (
          <Link href="/chats/[id]" as={`/chats/${chat.id}`} passHref>
            <Button
              as="a"
              content="Open chat"
              primary
              size="tiny"
              floated="right"
            />
          </Link>
        )}

        <Item.Header>
          {application.applicant_display_name}

          {!isEmptyString(application.applicant_ethereum_address) && (
            <>
              {' '}
              <a
                href={`${blockchainViewAddressURL}/${application.applicant_ethereum_address}`}
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
          <List bulleted horizontal>
            {application.price && (
              <List.Item>
                Price: {application.price} {coinSymbol}
              </List.Item>
            )}

            <List.Item>Created: {createdAt}</List.Item>
          </List>
        </Item.Meta>

        <Item.Description>
          <FormattedDescription description={application.comment} />
        </Item.Description>
      </Item.Content>
    </Item>
  )
}
