import React, { useState, useEffect, createContext } from 'react'
import getConfig from 'next/config'

import { ethers } from 'ethers'
import contractFactoryABI from '../../contracts/ContractFactory.json'

const { publicRuntimeConfig } = getConfig()

const Web3Context = createContext({})
export default Web3Context

export const Web3Provider = ({ children }) => {
  const tokenSymbol = publicRuntimeConfig.token_symbol

  const requiredChainId = publicRuntimeConfig.required_chain_id
  const blockchainNetworkName = publicRuntimeConfig.blockchain_network_name
  const blockchainViewAddressURL =
    publicRuntimeConfig.blockchain_view_address_url

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const [isWalletInstalled, setIsWalletInstalled] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [wallet, setWallet] = useState(undefined)
  const [provider, setProvider] = useState(undefined)
  const [signer, setSigner] = useState(undefined)
  const [currentChainId, setCurrentChainId] = useState(undefined)
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')
  const [accountBalance, setAccountBalance] = useState(null)
  const [accountBalanceLoading, setAccountBalanceLoading] = useState(false)
  const [contractFactory, setContractFactory] = useState(undefined)
  const [isWalletReady, setIsWalletReady] = useState(false)

  const contractFactoryAddress = publicRuntimeConfig.contract_factory_address

  const connectWallet = async () => {
    if (!wallet) {
      return
    }

    try {
      let chainId = await wallet.request({ method: 'eth_chainId' })

      if (chainId !== requiredChainId) {
        alert(
          `You are not connected to the ${publicRuntimeConfig.blockchain_network_name}`
        )

        return
      }

      const accounts = await wallet.request({ method: 'eth_requestAccounts' })

      setCurrentAccount(accounts[0])
      setIsWalletConnected(true)
    } catch (error) {
      console.error('Error connecting to MetaMask')
      console.error({ error })
      alert(error.message)

      setError(error?.message || error)
    }
  }

  // Check if MetaMask is installed
  useEffect(() => {
    const { ethereum } = window

    if (!ethereum) {
      return
    }

    setIsWalletInstalled(true)
    setWallet(ethereum)
  }, [])

  // Check if wallet is connected
  useEffect(() => {
    if (!wallet) {
      return
    }

    const perform = async () => {
      const accounts = await wallet.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        setCurrentAccount(accounts[0])
        setIsWalletConnected(true)
      }
    }

    perform()
  }, [wallet])

  // Checks if wallet is connected to the correct network
  useEffect(() => {
    if (!wallet) {
      return
    }

    const perform = async () => {
      let chainId = await wallet.request({ method: 'eth_chainId' })

      setCurrentChainId(chainId)
      setIsCorrectNetwork(chainId === requiredChainId)
    }

    perform()
  }, [wallet, requiredChainId])

  // Set web3 provider
  useEffect(() => {
    if (!isCorrectNetwork) {
      return
    }

    try {
      const _provider = new ethers.providers.Web3Provider(wallet)

      setProvider(_provider)
      setSigner(_provider.getSigner())
    } catch (err) {
      console.error('Unable to set web3 provider')
      console.error({ err })

      setError(err.message)
    }
  }, [isCorrectNetwork, wallet])

  // Initialize Smart Contracts
  useEffect(() => {
    if (!signer) {
      return
    }

    try {
      const _contractFactory = new ethers.Contract(
        contractFactoryAddress,
        contractFactoryABI,
        signer
      )
      setContractFactory(_contractFactory)
    } catch (err) {
      console.error('Unable to connect to ContractFactory')
      console.error({ err })

      setError(err.message)
    }
  }, [signer, contractFactoryAddress])

  // Get account balance
  useEffect(() => {
    if (currentAccount === '') {
      return
    }

    if (!provider) {
      return
    }

    const perform = async () => {
      try {
        const balance = await provider.getBalance(currentAccount)
        const balanceInEth = ethers.utils.formatEther(balance)

        const formattedBalance =
          +balanceInEth > 0 ? (+balanceInEth).toFixed(6) : balanceInEth
        setAccountBalance(formattedBalance)
      } catch (err) {
        console.error('Unable to get balance')
        console.error({ err })

        setError(err.message)
      }
    }

    setAccountBalanceLoading(true)
    perform()
    setAccountBalanceLoading(false)
  }, [provider, currentAccount])

  useEffect(() => {
    setIsWalletReady(
      isWalletInstalled &&
        isCorrectNetwork &&
        isWalletConnected &&
        currentAccount !== '' &&
        accountBalance !== ''
    )

    setIsLoading(false)
  }, [
    isWalletInstalled,
    isCorrectNetwork,
    isWalletConnected,
    currentAccount,
    accountBalance,
  ])

  return (
    <Web3Context.Provider
      value={{
        isLoading,
        error,

        requiredChainId,
        blockchainNetworkName,
        blockchainViewAddressURL,

        isWalletInstalled,
        isWalletConnected,

        currentChainId,
        isCorrectNetwork,
        currentAccount,

        accountBalance,
        accountBalanceLoading,

        tokenSymbol,

        connectWallet,

        contractFactory,
        signer,

        isWalletReady,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}
