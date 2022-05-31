import React from 'react'
import { Message, Icon } from 'semantic-ui-react'

export default function WrongBlockchainNetwork({ router }) {
  return (
    <Message negative icon>
      <Icon name="dont" />
      <Message.Content>
        <Message.Header>You are connected to the wrong network</Message.Header>

        <p>
          Please connect your MetaMask to the [Binance Smart Chain – Testnet]
          and{' '}
          <a href="#" onClick={() => router.reload()}>
            reload the page
          </a>
        </p>
      </Message.Content>
    </Message>
  )
}
