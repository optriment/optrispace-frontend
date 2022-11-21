import React, { useContext } from 'react'
import getConfig from 'next/config'
import Web3Context from '../../context/web3-context'
import { JustOneSecondBlockchain } from '../JustOneSecond'
import { WalletIsNotInstalled } from './WalletIsNotInstalled'
import { WrongBlockchainNetwork } from './WrongBlockchainNetwork'
import { ConnectWallet } from './ConnectWallet'
import { WrongAccount } from './WrongAccount'
import { NotEnoughMoney } from './NotEnoughMoney'

const { publicRuntimeConfig } = getConfig()
const blockchainNetworkName = publicRuntimeConfig.blockchain_network_name

export const WalletWrapper = ({ walletAddressToCompareWith, children }) => {
  const {
    isLoading: isLoadingWeb3,
    isWalletInstalled,
    isWalletConnected,
    isCorrectNetwork,
    connectWallet,
    currentAccount,
    accountBalance,
    coinSymbol,
  } = useContext(Web3Context)

  if (isLoadingWeb3) {
    return <JustOneSecondBlockchain />
  }

  if (!isWalletInstalled) {
    return <WalletIsNotInstalled />
  }

  if (!isCorrectNetwork) {
    return (
      <WrongBlockchainNetwork blockchainNetworkName={blockchainNetworkName} />
    )
  }

  if (!isWalletConnected) {
    return <ConnectWallet connectWallet={connectWallet} />
  }

  if (currentAccount !== walletAddressToCompareWith) {
    return (
      <WrongAccount
        currentAccount={currentAccount}
        walletAddressToCompareWith={walletAddressToCompareWith}
      />
    )
  }

  if (accountBalance == 0.0) {
    return <NotEnoughMoney coinSymbol={coinSymbol} />
  }

  return children
}
