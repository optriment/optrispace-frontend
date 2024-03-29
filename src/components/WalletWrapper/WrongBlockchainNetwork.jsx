import React from 'react'
import { Divider, Message, Icon } from 'semantic-ui-react'

export const WrongBlockchainNetwork = ({ blockchainNetworkName }) => (
  <Message warning icon>
    <Icon name="warning sign" />

    <Message.Content>
      <Message.Header>
        You are connected to the wrong blockchain network
      </Message.Header>

      <Divider />

      <p>
        Our platform uses {blockchainNetworkName}.
        <br />
        Please connect your MetaMask to the valid network and reload the page.
      </p>
    </Message.Content>
  </Message>
)
