import * as Sentry from '@sentry/nextjs'
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Divider, Icon, Message, Grid, Segment } from 'semantic-ui-react'
import { acceptContract, completeContract, signContract } from '../../lib/api'
import ErrorWrapper from '../ErrorWrapper'
import { ContractCardSidebar } from '../ContractCardSidebar'
import { ethers } from 'ethers'
import contractABI from '../../../contracts/Contract.json'
import Web3Context from '../../context/web3-context'
import { JustOneSecondBlockchain } from '../JustOneSecond'
import { FormattedDescription } from '../FormattedDescription'
import { ContractCardSteps } from '../ContractCardSteps'
import { Chat } from '../Chat'
import { WalletWrapper } from '../WalletWrapper'
import { UpdateContractStatusButton } from '../UpdateContractStatusButton'
import { WhatIsNextMessage } from '../WhatIsNextMessage'
import { ExecuteBlockchainTransactionButton } from '../ExecuteBlockchainTransactionButton'

const DoNotStartWorking = () => {
  return (
    <Message icon>
      <Icon name="bell" />

      <Message.Content>
        <Message.Header>Friendly reminder from OptriSpace Team:</Message.Header>

        <Divider />

        <p>
          This contract has not been funded yet!
          <br />
          Please don&apos;t start working on this job before getting funded
          contract!
        </p>
      </Message.Content>
    </Message>
  )
}

export const ContractCardForContractor = ({
  contract,
  token,
  coinSymbol,
  chat,
}) => {
  const router = useRouter()

  const {
    isLoading: isLoadingWeb3,
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

  useEffect(() => {
    // Skip requesting blockchain for specific statuses
    if (currentStatus === 'created') {
      return
    }

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
          if (err?.errorName === 'Unauthorized') {
            setError(
              'Your wallet account is not authorized to execute a request to blockchain. Please choose a valid account'
            )
          } else {
            console.error({ err })
            Sentry.captureException(err)
            setError(err.reason)
          }
        }
      })

    setTxStatus('')
    setTxLoading(false)
  }, [isWalletReady, currentStatus])

  return (
    <Grid columns={1} stackable>
      <Grid.Column only="computer">
        <ContractCardSteps
          me="contractor"
          currentStatus={currentStatus}
          currentStep={currentStep}
          statuses={statuses}
        />
      </Grid.Column>

      {error !== '' && (
        <Grid.Column>
          <ErrorWrapper header="Failed to perform action" error={error} />
        </Grid.Column>
      )}

      <Grid.Column>
        {isLoadingWeb3 || txLoading ? (
          <JustOneSecondBlockchain message={txStatus !== '' && txStatus} />
        ) : (
          <>
            {currentStatus === 'created' && (
              <>
                <DoNotStartWorking />

                <Message icon>
                  <Icon name="file text" />

                  <Message.Content>
                    <Message.Header>
                      Please check all requirements, terms and conditions of the
                      contract
                    </Message.Header>

                    <Divider />

                    <p>
                      Please ask your customer whatever you need to finish this
                      contract.
                      <br />
                      If you agree with the contract and all is good for you,
                      please click &quot;Accept Terms & Conditions &quot; to
                      continue.
                      <br />
                      After this step the customer will be able to create Smart
                      Contract on blockchain.
                    </p>
                  </Message.Content>
                </Message>

                <UpdateContractStatusButton
                  icon="check"
                  content="Accept Terms & Conditions"
                  onClick={setAsAcceptedOnBackend}
                />
              </>
            )}

            {currentStatus === 'accepted' && (
              <>
                <DoNotStartWorking />

                {contractStatus === 'Created' ? (
                  <WhatIsNextMessage>
                    <p>
                      Smart Contract has been created on blockchain and
                      available by{' '}
                      <a
                        href={`${blockchainViewAddressURL}/${contractAddress}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {contractAddress}
                      </a>
                      .
                      <br />
                      At this moment we are waiting for the contract to be
                      updated by the customer.
                      <br />
                      After this you will be able to sign the contract with your
                      wallet.
                    </p>
                  </WhatIsNextMessage>
                ) : (
                  <WhatIsNextMessage>
                    <p>
                      At this moment we are waiting for the contract to be
                      created on the blockchain by the customer.
                      <br />
                      After this you will be able to sign the contract with your
                      wallet.
                    </p>
                  </WhatIsNextMessage>
                )}
              </>
            )}

            {currentStatus === 'deployed' && (
              <>
                <DoNotStartWorking />

                {contractStatus === 'Signed' ? (
                  <>
                    <Message positive icon>
                      <Icon name="check" />

                      <Message.Content>
                        <Message.Header>
                          Smart Contract has been successfully signed!
                        </Message.Header>

                        <Divider />

                        <p>
                          Please click &quot;Update Contract Status&quot; to
                          send updated contract to the customer.
                          <br />
                          After this step the customer will be able to fund
                          Smart Contract on blockchain.
                        </p>
                      </Message.Content>
                    </Message>

                    <UpdateContractStatusButton
                      onClick={setAsSignedOnBackend}
                    />
                  </>
                ) : (
                  <>
                    <WalletWrapper
                      walletAddressToCompareWith={contract.performer_address}
                    >
                      <>
                        <Message icon>
                          <Icon name="file text" />

                          <Message.Content>
                            <Message.Header>
                              Smart Contract is ready to be signed!
                            </Message.Header>

                            <Divider />

                            <p>
                              Please click &quot;Sign Smart Contract&quot; to
                              continue.
                              <br />
                              You have to pay gas fee for this transaction.
                              <br />
                              After this step the customer will be able to fund
                              Smart Contract on blockchain.
                            </p>
                          </Message.Content>
                        </Message>

                        <ExecuteBlockchainTransactionButton
                          content="Sign Smart Contract"
                          onClick={signOnBlockchain}
                        />
                      </>
                    </WalletWrapper>
                  </>
                )}
              </>
            )}

            {currentStatus === 'signed' && (
              <>
                <DoNotStartWorking />

                {contractStatus === 'Funded' ? (
                  <WhatIsNextMessage>
                    <p>
                      Smart Contract has been funded by
                      {` ${contract.price} ${coinSymbol}`}.
                      <br />
                      At this moment we are waiting for the contract to be
                      updated by the customer.
                      <br />
                      After this you will be able to start your work.
                    </p>
                  </WhatIsNextMessage>
                ) : (
                  <WhatIsNextMessage>
                    <p>
                      At this moment we are waiting for the Smart Contract to be
                      funded on the blockchain by the customer.
                      <br />
                      After this you will be able to start your work.
                    </p>
                  </WhatIsNextMessage>
                )}
              </>
            )}

            {currentStatus === 'funded' && (
              <>
                {contractStatus === 'Approved' ? (
                  <WhatIsNextMessage>
                    <p>
                      Your work results have been approved by the customer.
                      <br />
                      At this moment we are waiting for the contract to be
                      updated by the customer.
                    </p>

                    <p>After this you will be able to request your money.</p>
                  </WhatIsNextMessage>
                ) : (
                  <WhatIsNextMessage>
                    <p>
                      Right now you need to start working on this task.
                      <br />
                      Please use internal chat to communicate with the customer
                      and do your best!
                    </p>
                    <p>
                      You will be able to request your money when the customer
                      approves your work results.
                    </p>
                  </WhatIsNextMessage>
                )}
              </>
            )}

            {currentStatus === 'approved' && (
              <>
                {contractStatus === 'Closed' ? (
                  <>
                    <Message positive icon>
                      <Icon name="money" />

                      <Message.Content>
                        <Message.Header>
                          Congratulations! You have withdrawn money from the
                          Smart Contract!
                        </Message.Header>

                        <Divider />

                        <p>
                          We hope you have enjoyed working with this customer!
                          <br />
                          If you have any ideas on how to improve OptriSpace –
                          feel free to contact us.
                        </p>

                        <p>
                          Please click &quot;Update Contract Status&quot; to
                          close contract.
                        </p>
                      </Message.Content>
                    </Message>

                    <UpdateContractStatusButton
                      onClick={setAsCompletedOnBackend}
                    />
                  </>
                ) : (
                  <WalletWrapper
                    walletAddressToCompareWith={contract.performer_address}
                  >
                    <>
                      <Message icon>
                        <Icon name="money" />

                        <Message.Content>
                          <Message.Header>
                            You are able to withdraw money!
                          </Message.Header>

                          <Divider />

                          <p>
                            Please click &quot;Withdraw&quot; button to open
                            MetaMask to request money.
                            <br />
                            You have to pay gas fee for this transaction.
                          </p>
                        </Message.Content>
                      </Message>

                      <ExecuteBlockchainTransactionButton
                        content="Withdraw"
                        onClick={withdrawOnBlockchain}
                      />
                    </>
                  </WalletWrapper>
                )}
              </>
            )}

            {currentStatus === 'completed' && (
              <Message positive icon>
                <Icon name="fire" />

                <Message.Content>
                  <Message.Header>Congratulations!</Message.Header>

                  <Divider />

                  <p>We hope you have enjoyed working with this customer!</p>

                  <p>
                    If you have any ideas on how to improve OptriSpace – feel
                    free to contact us.
                  </p>
                </Message.Content>
              </Message>
            )}
          </>
        )}
      </Grid.Column>

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
