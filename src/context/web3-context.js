import React, { useState, useEffect, createContext } from 'react'
import getConfig from 'next/config'

import { ethers } from 'ethers'
import tokenABI from '../../contracts/token.json'
import contractFactoryABI from '../../contracts/ContractFactory.json'

const { publicRuntimeConfig } = getConfig()

const Web3Context = createContext({})
export default Web3Context

export const Web3Provider = ({ children }) => {
  const tokenSymbol = 'ALZ'
  const tokenDecimals = 6

  const requiredChainId = '0x61' // Binance Smart Chain Testnet

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [isWalletInstalled, setIsWalletInstalled] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [wallet, setWallet] = useState(undefined)
  const [signer, setSigner] = useState(undefined)
  const [currentChainId, setCurrentChainId] = useState(undefined)
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')
  const [accountBalance, setAccountBalance] = useState(null)
  const [accountBalanceLoading, setAccountBalanceLoading] = useState(true)
  const [token, setToken] = useState(undefined)
  const [contractFactory, setContractFactory] = useState(undefined)
  const [isWalletReady, setIsWalletReady] = useState(false)

  const contractFactoryAddress = publicRuntimeConfig.contract_factory_address
  const tokenAddress = publicRuntimeConfig.token_address

  const connectWallet = async () => {
    if (!wallet) {
      return
    }

    try {
      let chainId = await wallet.request({ method: 'eth_chainId' })

      if (chainId !== requiredChainId) {
        alert('You are not connected to the Binance Smart Chain – Testnet!')

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
  }, [wallet])

  // Set web3 provider
  useEffect(() => {
    if (!isCorrectNetwork) {
      return
    }

    try {
      const _provider = new ethers.providers.Web3Provider(wallet)

      setSigner(_provider.getSigner())
    } catch (err) {
      console.error({ err })
    }
  }, [isCorrectNetwork, wallet])

  // Initialize Smart Contracts
  useEffect(() => {
    if (!signer) {
      return
    }

    try {
      const _token = new ethers.Contract(tokenAddress, tokenABI, signer)
      setToken(_token)

      const _contractFactory = new ethers.Contract(
        contractFactoryAddress,
        contractFactoryABI,
        signer
      )
      setContractFactory(_contractFactory)
    } catch (err) {
      console.error({ err })
    }
  }, [signer, contractFactoryAddress, tokenAddress])

  // Update account balance
  useEffect(() => {
    if (currentAccount === '') {
      return
    }

    if (!token) {
      return
    }

    const perform = async () => {
      try {
        const balance = await token.balanceOf(currentAccount)

        setAccountBalance(parseFloat(balance) / 10 ** tokenDecimals)
        setAccountBalanceLoading(false)
      } catch (err) {
        console.error(err)

        throw err
      }
    }

    perform()
  }, [currentAccount, token])

  useEffect(() => {
    setIsLoading(false)

    setIsWalletReady(
      isWalletInstalled &&
        isCorrectNetwork &&
        isWalletConnected &&
        currentAccount !== ''
    )
  }, [isWalletInstalled, isCorrectNetwork, isWalletConnected, currentAccount])

  return (
    <Web3Context.Provider
      value={{
        isLoading,
        error,

        requiredChainId,

        isWalletInstalled,
        isWalletConnected,

        currentChainId,
        isCorrectNetwork,
        currentAccount,

        accountBalance,
        accountBalanceLoading,

        tokenSymbol,
        tokenDecimals,

        connectWallet,

        contractFactory,
        token,
        signer,

        isWalletReady,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}
