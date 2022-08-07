import React from 'react'
import { Segment, Header } from 'semantic-ui-react'

export const ContractCardSidebar = ({
  contract,
  currencyLabel,
  blockchainViewAddressURL,
  contractBalance = '',
}) => {
  return (
    <Segment.Group>
      <Segment>
        <Header as="h3">Price</Header>

        <p>
          {contract.price} {currencyLabel}
        </p>
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
        <Header as="h3">Contractor Wallet Address</Header>

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
        <Header as="h3">Contract Address</Header>

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
        <Header as="h3">Contract Balance</Header>

        {contract.contract_address ? (
          <p>
            {parseFloat(+contractBalance)} {currencyLabel}
          </p>
        ) : (
          <p>Not funded yet</p>
        )}
      </Segment>
    </Segment.Group>
  )
}
