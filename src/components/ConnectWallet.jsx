import React from 'react'
import { Message, Icon } from 'semantic-ui-react'

export default function ConnectWallet({ connectWallet }) {
  return (
    <Message warning icon>
      <Icon name="warning" />
      <Message.Content>
        <Message.Header>We need to get your blockchain address</Message.Header>

        <p>
          Please{' '}
          <a href="#" onClick={connectWallet}>
            connect wallet
          </a>{' '}
          to allow access to MetaMask.
        </p>
      </Message.Content>
    </Message>
  )
}
