import React from 'react'
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
      <Item.Image size="tiny" avatar src="/default-userpic-128x128.png" />

      <Item.Content>
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

        <Item.Extra>
          {application.contract_id ? (
            <Button
              size="tiny"
              primary
              floated="right"
              href={`/contracts/${application.contract_id}`}
              content="Open contract"
            />
          ) : (
            <Button
              size="tiny"
              primary
              floated="right"
              href={`/jobs/${job.id}/contracts/new?application_id=${application.id}`}
              content="Hire"
              disabled={isEmptyString(application.applicant_ethereum_address)}
            />
          )}

          {chat && (
            <Button
              size="tiny"
              primary
              floated="right"
              href={`/chats/${chat.id}`}
              content="Open chat"
            />
          )}
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}
