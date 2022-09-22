import React, { useContext } from 'react'
import { Table } from 'semantic-ui-react'
import Web3Context from '../context/web3-context'

export const Web3Debug = () => {
  const {
    error: web3Error,
    isLoading: web3Loading,
    requiredChainId,
    currentChainId,
    tokenSymbol,
    isWalletInstalled,
    isCorrectNetwork,
    isWalletConnected,
    currentAccount,
    accountBalance,
    isWalletReady,
  } = useContext(Web3Context)

  return (
    <Table compact celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={6}>Variable</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row negative={web3Error && web3Error !== ''}>
          <Table.Cell>web3Error</Table.Cell>
          <Table.Cell>{web3Error}</Table.Cell>
        </Table.Row>
        <Table.Row warning={web3Loading}>
          <Table.Cell>web3Loading</Table.Cell>
          <Table.Cell>{web3Loading ? 'true' : 'false'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>requiredChainId</Table.Cell>
          <Table.Cell>{requiredChainId}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>currentChainId</Table.Cell>
          <Table.Cell>{currentChainId}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>tokenSymbol</Table.Cell>
          <Table.Cell>{tokenSymbol}</Table.Cell>
        </Table.Row>
        <Table.Row positive={isWalletInstalled} negative={!isWalletInstalled}>
          <Table.Cell>isWalletInstalled</Table.Cell>
          <Table.Cell>{isWalletInstalled ? 'true' : 'false'}</Table.Cell>
        </Table.Row>
        <Table.Row positive={isCorrectNetwork} negative={!isCorrectNetwork}>
          <Table.Cell>isCorrectNetwork</Table.Cell>
          <Table.Cell>{isCorrectNetwork ? 'true' : 'false'}</Table.Cell>
        </Table.Row>
        <Table.Row positive={isWalletConnected} negative={!isWalletConnected}>
          <Table.Cell>isWalletConnected</Table.Cell>
          <Table.Cell>{isWalletConnected ? 'true' : 'false'}</Table.Cell>
        </Table.Row>
        <Table.Row positive={isWalletReady} negative={!isWalletReady}>
          <Table.Cell>isWalletReady</Table.Cell>
          <Table.Cell>{isWalletReady ? 'true' : 'false'}</Table.Cell>
        </Table.Row>
        <Table.Row
          positive={currentAccount !== ''}
          negative={currentAccount === ''}
        >
          <Table.Cell>currentAccount</Table.Cell>
          <Table.Cell>{currentAccount}</Table.Cell>
        </Table.Row>
        <Table.Row
          positive={accountBalance && accountBalance > 0}
          warning={accountBalance === 0}
        >
          <Table.Cell>accountBalance</Table.Cell>
          <Table.Cell>{accountBalance}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
