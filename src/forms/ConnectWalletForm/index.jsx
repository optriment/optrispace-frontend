import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Message } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { changeWallet } from '../../lib/settings'
import { isEmptyString } from '../../lib/validators'
import Web3Context from '../../context/web3-context'
import { errorHandler } from '../../lib/errorHandler'

export const ConnectWalletForm = ({ token, person }) => {
  const router = useRouter()
  const {
    isWalletInstalled,
    isWalletConnected,
    currentAccount,
    connectWallet,
  } = useContext(Web3Context)

  const [error, setError] = useState('')

  const handleUpdateWallet = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await changeWallet(token, person.id, {
        walletAddress: currentAccount,
      })

      router.reload()
    } catch (err) {
      console.error({ err })

      setError(errorHandler(err))
    }
  }

  if (!isWalletInstalled) {
    return (
      <Message
        negative
        header="MetaMask Wallet is not installed in your browser"
      />
    )
  }

  if (!isWalletConnected) {
    return (
      <Form>
        <Form.Input fluid error readOnly placeholder="Please open MetaMask" />

        <Button primary fluid onClick={connectWallet}>
          Open MetaMask
        </Button>
      </Form>
    )
  }

  return (
    <>
      {error !== '' && (
        <ErrorWrapper header="Unable to change wallet address" error={error} />
      )}

      <Form onSubmit={handleUpdateWallet}>
        {isEmptyString(person.ethereum_address) && (
          <Message positive header="Please save settings" />
        )}

        <Form.Input fluid value={currentAccount} readOnly />

        <Button primary fluid>
          Save
        </Button>
      </Form>
    </>
  )
}
