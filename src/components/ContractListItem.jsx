import React from 'react'
import Link from 'next/link'
import { Header, Divider, Label, Icon } from 'semantic-ui-react'
import { formatDateTime } from '../lib/formatDate'

export default function ContractListItem({ person, contract, coinSymbol }) {
  const createdAt = formatDateTime(contract.created_at)

  let statusIcon = 'hourglass'

  switch (contract.status) {
    case 'signed':
      statusIcon = 'hourglass outline'
      break
    case 'funded':
      statusIcon = 'hourglass start'
      break
    case 'approved':
      statusIcon = 'hourglass half'
      break
    case 'completed':
      statusIcon = 'hourglass end'
      break
  }

  return (
    <>
      <Header as="h3">
        <Link href={`/contracts/${contract.id}`}>{contract.title}</Link>
      </Header>

      <div style={{ wordWrap: 'break-word' }}>
        {contract.description
          .trim()
          .split('\n')
          .map((str, idx) => {
            if (idx < 5) {
              return (
                <div key={idx}>
                  {str}

                  <br />
                </div>
              )
            }
          })}
      </div>

      <Divider />

      <Label>
        <Icon name="user" />
        {contract.performer_id === person.id
          ? contract.customer_display_name
          : contract.performer_display_name}
      </Label>

      <Label>
        <Icon name="money" /> {contract.price} {coinSymbol}
      </Label>

      <Label>
        <Icon name={statusIcon} title="Status" /> {contract.status}
      </Label>

      <Label>
        <Icon name="clock" title="Created" /> {createdAt}
      </Label>
    </>
  )
}
