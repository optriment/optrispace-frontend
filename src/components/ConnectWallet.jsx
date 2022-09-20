import React from 'react'
import { Message, Icon } from 'semantic-ui-react'

export default function ConnectWallet({ connectWallet }) {
  return (
    <Message warning icon>
      <Icon name="warning" />
      <Message.Content>
        <Message.Header>Your wallet is not connected</Message.Header>

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
