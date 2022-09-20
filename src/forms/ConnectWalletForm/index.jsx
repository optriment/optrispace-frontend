import * as Sentry from '@sentry/nextjs'
import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Segment, Message } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { changeWallet } from '../../lib/settings'
import { isEmptyString } from '../../lib/validators'
import Web3Context from '../../context/web3-context'

export const ConnectWalletForm = ({ token, person }) => {
  const {
    isWalletInstalled,
    isWalletConnected,
    currentAccount,
    connectWallet,
  } = useContext(Web3Context)
  const router = useRouter()

  const [error, setError] = useState('')

  const handleUpdateWallet = () => {
    if (isEmptyString(currentAccount)) {
      return
    }

    setError('')

    try {
      changeWallet(token, person.id, {
        walletAddress: currentAccount,
      })

      router.reload()
    } catch (err) {
      console.error({ err })
      Sentry.captureException(err)
      setError(err)
    }
  }

  return (
    <>
      {error !== '' && (
        <ErrorWrapper header="Unable to change wallet address" error={error} />
      )}

      <Form size="large">
        <Segment>
          {isWalletInstalled ? (
            <>
              {isWalletConnected ? (
                <>
                  <Form.Input fluid value={currentAccount} readOnly />

                  <Button
                    primary
                    fluid
                    size="large"
                    onClick={handleUpdateWallet}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Form.Input
                    fluid
                    error
                    readOnly
                    placeholder="Please open MetaMask"
                  />

                  <Button primary fluid size="large" onClick={connectWallet}>
                    Open MetaMask
                  </Button>
                </>
              )}
            </>
          ) : (
            <Message
              negative
              header="MetaMask Wallet is not installed in your browser"
            />
          )}
        </Segment>
      </Form>
    </>
  )
}
