import React from 'react'
import { Label, Divider, Button, Header, Icon } from 'semantic-ui-react'
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
    <>
      <Header as="h3">{application.applicant_display_name}</Header>

      {!isEmptyString(application.applicant_ethereum_address) && (
        <span>
          <a
            href={`${blockchainViewAddressURL}/${application.applicant_ethereum_address}`}
            target="_blank"
            rel="noreferrer noopener nofollow"
            title="Open wallet information"
          >
            <Icon name="address card" /> View transactions history
          </a>
        </span>
      )}

      <Divider />

      <div style={{ wordWrap: 'break-word' }}>
        <FormattedDescription description={application.comment} />
      </div>

      <Divider />

      <Label>
        <Icon name="money" /> {application.price} {coinSymbol}
      </Label>

      <Label>
        <Icon name="clock" title="Created" /> {createdAt}
      </Label>

      <Divider />

      {application.contract_id ? (
        <Button
          size="tiny"
          positive
          href={`/contracts/${application.contract_id}`}
          content="Open contract"
        />
      ) : (
        <Button
          size="tiny"
          primary
          href={`/jobs/${job.id}/contracts/new?application_id=${application.id}`}
          content="Hire"
          disabled={isEmptyString(application.applicant_ethereum_address)}
        />
      )}

      {chat && (
        <Button
          size="tiny"
          secondary
          href={`/chats/${chat.id}`}
          content="Open chat"
        />
      )}
    </>
  )
}
