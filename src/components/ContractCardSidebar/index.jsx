import React from 'react'
import { Segment, Header } from 'semantic-ui-react'

export const ContractCardSidebar = ({
  contract,
  coinSymbol,
  blockchainViewAddressURL,
  contractBalance = '',
}) => {
  return (
    <Segment.Group>
      <Segment>
        <Header as="h4">Price</Header>

        <p>
          {contract.price} {coinSymbol}
        </p>
      </Segment>

      <Segment>
        <Header as="h4">Customer Wallet Address</Header>

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
        <Header as="h4">Contractor Wallet Address</Header>

        {contract.performer_address ? (
          <p>
            <a
              href={`${blockchainViewAddressURL}/${contract.performer_address}`}
              target="_blank"
              rel="noreferrer"
            >
              {contract.performer_address}
            </a>
          </p>
        ) : (
          <p>Not accepted yet</p>
        )}
      </Segment>

      <Segment>
        <Header as="h4">Contract Address</Header>

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
        <Header as="h4">Contract Balance</Header>

        {contract.contract_address ? (
          <p>
            {parseFloat(+contractBalance)} {coinSymbol}
          </p>
        ) : (
          <p>Not funded yet</p>
        )}
      </Segment>
    </Segment.Group>
  )
}
