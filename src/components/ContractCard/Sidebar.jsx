import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import { formatDateTime } from '../../lib/formatDate'

export default function Sidebar({ contract, tokenSymbol }) {
  return (
    <Segment.Group>
      <Segment>
        <Header as="h3">Price</Header>

        <p>
          {contract.price} {tokenSymbol}
        </p>
      </Segment>

      <Segment>
        <Header as="h3">Contract Blockchain Address</Header>

        {contract.contract_address && (
          <p>
            <a
              href={`https://testnet.bscscan.com/address/${contract.contract_address}`}
              target="_blank"
              rel="noreferrer"
            >
              {contract.contract_address}
            </a>
          </p>
        )}
      </Segment>

      <Segment>
        <Header as="h3">Customer Blockchain Address</Header>

        {contract.customer_address && (
          <p>
            <a
              href={`https://testnet.bscscan.com/address/${contract.customer_address}`}
              target="_blank"
              rel="noreferrer"
            >
              {contract.customer_address}
            </a>
          </p>
        )}
      </Segment>

      <Segment>
        <Header as="h3">Performer Blockchain Address</Header>

        {contract.performer_address && (
          <p>
            <a
              href={`https://testnet.bscscan.com/address/${contract.performer_address}`}
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
