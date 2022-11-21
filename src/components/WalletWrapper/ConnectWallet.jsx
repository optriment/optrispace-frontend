import React from 'react'
import { Message, Divider, Icon } from 'semantic-ui-react'

export const ConnectWallet = ({ connectWallet }) => (
  <Message warning icon>
    <Icon name="warning sign" />

    <Message.Content>
      <Message.Header>
        Your MetaMask wallet is not connected to OptriSpace
      </Message.Header>

      <Divider />

      <p>
        Unfortunately we don&apos;t have access to your wallet.
        <br />
        MetaMask is used to interact with transactions on blockchain.
      </p>

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
