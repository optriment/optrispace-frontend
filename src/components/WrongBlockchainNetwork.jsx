import React from 'react'
import getConfig from 'next/config'
import { Message, Icon } from 'semantic-ui-react'

const { publicRuntimeConfig } = getConfig()

export default function WrongBlockchainNetwork({ router }) {
  const blockchainNetworkName = publicRuntimeConfig.blockchain_network_name

  return (
    <Message negative icon>
      <Icon name="dont" />
      <Message.Content>
        <Message.Header>You are connected to the wrong network</Message.Header>

        <p>
          Please connect your MetaMask to the {blockchainNetworkName}
          {' and '}
          <a href="#" onClick={() => router.reload()}>
            reload the page
          </a>
        </p>
      </Message.Content>
    </Message>
  )
}
