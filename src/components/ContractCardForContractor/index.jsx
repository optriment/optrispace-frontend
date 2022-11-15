import * as Sentry from '@sentry/nextjs'
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Message, Button, Grid, Segment } from 'semantic-ui-react'
import { acceptContract, completeContract, signContract } from '../../lib/api'
import ErrorWrapper from '../ErrorWrapper'
import { ContractCardSidebar } from '../ContractCardSidebar'
import { ethers } from 'ethers'
import contractABI from '../../../contracts/Contract.json'
import Web3Context from '../../context/web3-context'
import WalletIsNotInstalled from '../WalletIsNotInstalled'
import { JustOneSecondBlockchain } from '../JustOneSecond'
import WrongBlockchainNetwork from '../WrongBlockchainNetwork'
import ConnectWallet from '../ConnectWallet'
import { FormattedDescription } from '../FormattedDescription'
import { ContractCardSteps } from '../ContractCardSteps'
import { Chat } from '../Chat'

export const ContractCardForContractor = ({
  contract,
  token,
  coinSymbol,
  chat,
}) => {
  const router = useRouter()

  const {
    isLoading: isLoadingWeb3,
    isWalletInstalled,
    isCorrectNetwork,
    connectWallet,
    currentAccount,
    contractFactory, // FIXME: Rename to contractFactoryContract
    signer,
    isWalletReady,
    blockchainViewAddressURL,
  } = useContext(Web3Context)

  const [error, setError] = useState('')

  const [txLoading, setTxLoading] = useState(false)
  const [txStatus, setTxStatus] = useState('')

  const [contractAddress, setContractAddress] = useState('')
  const [contractBalance, setContractBalance] = useState('')
  const [contractStatus, setContractStatus] = useState('')

  const reset = () => {
    setError('')
    setTxStatus('')
    setTxLoading(false)
  }

  const catchException = (err) => {
    reset()

    console.error({ err })
    Sentry.captureException(err)

    if (err?.data?.message.match(/execution reverted/)) {
      setError(
        'Blockchain error: ' +
          err.data.message.replace(/execution reverted:/, '').trim()
      )
    } else if (err.message.match(/user (denied|rejected) transaction/i)) {
      setError('You are denied transaction! Please try again.')
    } else {
      setError(
        'Transaction error: ' + (err?.data?.message || err?.message || err)
      )
    }
  }

  const callSmartContract = async (action, validate, callback) => {
    reset()

    if (!isWalletReady) {
      setError('Wallet is not ready')
      return
    }

    if (!validate()) {
      return
    }

    setTxLoading(true)
    setTxStatus(`Smart Contract: ${action}...`)

    try {
      const tx = await callback()

      setTxStatus('Waiting for transaction hash...')

      await tx.wait()

      router.reload()
    } catch (err) {
      catchException(err)
    }
  }

  const callBackend = (validate, callback) => {
    reset()

    if (!validate()) {
      return
    }

    try {
      callback()
        .then(() => router.reload())
        .catch((err) => setError(err?.info?.message || err.message))
    } catch (err) {
      console.error({ err })
      Sentry.captureException(err)
      setError(err.message)
    }
  }

  const getContractFromBlockchain = async () => {
    const _contractOnBlockchain = await contractFactory.getContractById(
      contract.id
    )

    return _contractOnBlockchain
  }

  const setAsAcceptedOnBackend = () => {
    callBackend(
      () => {
        return true
      },
      () => {
        return acceptContract(token, contract.id)
      }
    )
  }

  const signOnBlockchain = async () => {
    await callSmartContract(
      'Sign',
      () => {
        if (contractStatus !== 'Created') {
          setError('The contract has not been deployed on the blockchain')
          return false
        }

        return true
      },

      () => {
        const _contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )

        return _contract.sign()
      }
    )
  }

  const setAsSignedOnBackend = async () => {
    callBackend(
      () => {
        if (contractStatus !== 'Signed') {
          setError('The contract has not been signed on the blockchain')
          return false
        }

        return true
      },
      () => {
        return signContract(token, contract.id)
      }
    )
  }

  const withdrawOnBlockchain = async () => {
    await callSmartContract(
      'Withdraw',
      () => {
        if (contractStatus !== 'Approved') {
          setError('The contract has not been approved on the blockchain')
          return false
        }

        return true
      },

      () => {
        const _contract = new ethers.Contract(
          contract.contract_address,
          contractABI,
          signer
        )

        return _contract.withdraw()
      }
    )
  }

  const setAsCompletedOnBackend = () => {
    callBackend(
      () => {
        if (contractStatus !== 'Closed') {
          setError('The contract has not been withdrawn on the blockchain')
          return false
        }

        return true
      },
      () => {
        return completeContract(token, contract.id)
      }
    )
  }

  const convertToEth = (value) => {
    return ethers.utils.formatEther(value.toString())
  }

  useEffect(() => {
    reset()

    if (!isWalletReady) {
      return
    }

    setTxLoading(true)
    setTxStatus('Requesting contract from blockchain...')

    getContractFromBlockchain()
      .then((_contractOnBlockchain) => {
        setContractAddress(_contractOnBlockchain[0])
        setContractStatus(_contractOnBlockchain[8])
        setContractBalance(convertToEth(_contractOnBlockchain[1]))
      })
      .catch((err) => {
        if (err.reason !== 'Contract does not exist') {
          console.error({ err })
          Sentry.captureException(err)
          setError(err.reason)
        }
      })

    setTxStatus('')
    setTxLoading(false)
  }, [])

  if (!isWalletInstalled) {
    return <WalletIsNotInstalled />
  }

  if (!isCorrectNetwork) {
    return <WrongBlockchainNetwork router={router} />
  }

  const currentStatus = contract.status

  const statuses = {
    created: 1,
    accepted: 2,
    deployed: 3,
    signed: 4,
    funded: 5,
    approved: 6,
    completed: 7,
  }

  const currentStep = statuses[currentStatus] + 1

  return (
    <Grid columns={1} stackable>
      {isWalletInstalled && isCorrectNetwork && currentAccount === '' && (
        <Grid.Column>
          <ConnectWallet connectWallet={connectWallet} />
        </Grid.Column>
      )}

      <Grid.Column only="computer">
        <ContractCardSteps
          me="contractor"
          currentStatus={currentStatus}
          currentStep={currentStep}
          statuses={statuses}
        />
      </Grid.Column>

      <Grid.Column>
        {isLoadingWeb3 || txLoading ? (
          <JustOneSecondBlockchain message={txStatus !== '' && txStatus} />
        ) : (
          <>
            {currentStatus === 'created' && (
              <Button
                floated="right"
                primary
                content="Accept"
                onClick={setAsAcceptedOnBackend}
              />
            )}

            {currentStatus === 'accepted' && (
              <>
                {contractStatus === 'Created' ? (
                  <Message header="Waiting for the contract to get a deployed status" />
                ) : (
                  <Message header="Waiting for the contract to be deployed on the blockchain" />
                )}
              </>
            )}

            {currentStatus === 'deployed' && (
              <>
                {contractStatus === 'Signed' ? (
                  <>
                    <Message positive>
                      <Message.Header>
                        Smart Contract has been successfully signed!
                      </Message.Header>
                      <p>
                        <br />
                        Please click &quot;Set as signed&quot; to update status
                        for the customer.
                      </p>
                    </Message>

                    <Button
                      floated="right"
                      primary
                      content="Set as signed"
                      onClick={setAsSignedOnBackend}
                    />
                  </>
                ) : (
                  <>
                    <Message>
                      <Message.Header>
                        Smart Contract is ready to be signed!
                      </Message.Header>
                      <p>
                        <br />
                        Please click &quot;Sign&quot; to continue.
                        <br />
                        You have to pay gas fee for this transaction.
                      </p>
                    </Message>

                    <Button
                      floated="right"
                      primary
                      content="Sign"
                      onClick={signOnBlockchain}
                      disabled={!isWalletReady}
                    />
                  </>
                )}
              </>
            )}

            {currentStatus === 'signed' && (
              <>
                {contractStatus === 'Funded' ? (
                  <Message header="Waiting for the contract to get a funded status" />
                ) : (
                  <Message header="Waiting for the contract to be funded on the blockchain" />
                )}
              </>
            )}

            {currentStatus === 'funded' && (
              <>
                {contractStatus === 'Approved' ? (
                  <Message header="Waiting for the contract to get an approved status" />
                ) : (
                  <Message header="Waiting for the contract to be approved on the blockchain" />
                )}
              </>
            )}

            {currentStatus === 'approved' && (
              <>
                {contractStatus === 'Closed' ? (
                  <>
                    <Message positive>
                      <Message.Header>
                        Congratulations! You have withdrawn money from the Smart
                        Contract!
                      </Message.Header>
                      <p>
                        <br />
                        We hope you have enjoyed working with this customer!
                        <br />
                        If you have any ideas on how to improve OptriSpace –
                        feel free to contact us.
                        <br />
                        <br />
                        Please click &quot;Set as completed&quot; to close
                        contract.
                      </p>
                    </Message>

                    <Button
                      floated="right"
                      primary
                      content="Set as completed"
                      onClick={setAsCompletedOnBackend}
                    />
                  </>
                ) : (
                  <>
                    <Message>
                      <Message.Header>
                        You are able to withdraw money!
                      </Message.Header>
                      <p>
                        <br />
                        Please click &quot;Withdraw&quot; button to open
                        MetaMask to request money.
                      </p>
                    </Message>

                    <Button
                      floated="right"
                      primary
                      content="Withdraw"
                      onClick={withdrawOnBlockchain}
                      disabled={!isWalletReady}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </Grid.Column>

      {error !== '' && (
        <Grid.Column>
          <ErrorWrapper header="Failed to perform action" error={error} />
        </Grid.Column>
      )}

      <Grid.Column mobile={16} computer={10}>
        <Segment>
          <div style={{ wordWrap: 'break-word' }}>
            <FormattedDescription description={contract.description} />
          </div>
        </Segment>

        {chat?.id && (
          <Segment>
            <Chat chatId={chat.id} token={token} />
          </Segment>
        )}
      </Grid.Column>

      <Grid.Column mobile={16} computer={6}>
        <ContractCardSidebar
          contract={contract}
          coinSymbol={coinSymbol}
          blockchainViewAddressURL={blockchainViewAddressURL}
          contractBalance={contractBalance}
        />
      </Grid.Column>
    </Grid>
  )
}
