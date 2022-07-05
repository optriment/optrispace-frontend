import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import { formatDateTime } from '../../lib/formatDate'

export default function Sidebar({
  contract,
  tokenSymbol,
  blockchainViewAddressURL,
}) {
  return (
    <Segment.Group>
      <Segment>
        <Header as="h3">Price</Header>

        <p>
          {contract.price} {tokenSymbol}
        </p>
      </Segment>

      <Segment>
        <Header as="h3">Contract Wallet Address</Header>

        {contract.contract_address ? (
          <p>
            <a
              href={`${blockchainViewAddressURL}/${contract.contract_address}`}
              target="_blank"
              rel="noreferrer"
            >
              {contract.contract_address}
            </a>
          </p>
        ) : (
          <p>Not deployed yet</p>
        )}
      </Segment>

      <Segment>
        <Header as="h3">Customer Wallet Address</Header>

        {contract.customer_address && (
          <p>
            <a
              href={`${blockchainViewAddressURL}/${contract.customer_address}`}
              target="_blank"
              rel="noreferrer"
            >
              {contract.customer_address}
            </a>
          </p>
        )}
      </Segment>

      <Segment>
        <Header as="h3">Performer Wallet Address</Header>

        {contract.performer_address && (
          <p>
            <a
              href={`${blockchainViewAddressURL}/${contract.performer_address}`}
              target="_blank"
              rel="noreferrer"
            >
              {contract.performer_address}
            </a>
          </p>
        )}
      </Segment>

      <Segment>
        <Header as="h3">Updated At</Header>

        <p>{formatDateTime(contract.updated_at)}</p>
      </Segment>
    </Segment.Group>
  )
}
