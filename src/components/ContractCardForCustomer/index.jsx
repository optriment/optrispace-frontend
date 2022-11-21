import * as Sentry from '@sentry/nextjs'
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Icon, Divider, Message, Grid, Segment } from 'semantic-ui-react'
import { approveContract, deployContract, fundContract } from '../../lib/api'
import ErrorWrapper from '../ErrorWrapper'
import { ContractCardSidebar } from '../ContractCardSidebar'
import { Chat } from '../Chat'
import { ethers } from 'ethers'
import contractABI from '../../../contracts/Contract.json'
import Web3Context from '../../context/web3-context'
import { JustOneSecondBlockchain } from '../JustOneSecond'
import { FormattedDescription } from '../FormattedDescription'
import { isEmptyString } from '../../lib/validators'
import { ContractCardSteps } from '../ContractCardSteps'
import { WalletWrapper } from '../WalletWrapper'
import { ExecuteBlockchainTransactionButton } from '../ExecuteBlockchainTransactionButton'
import { UpdateContractStatusButton } from '../UpdateContractStatusButton'
import { WhatIsNextMessage } from '../WhatIsNextMessage'

export const ContractCardForCustomer = ({
  contract,
  token,
  coinSymbol,
  chat,
}) => {
  const router = useRouter()

  const {
    isLoading: isLoadingWeb3,
    accountBalance,
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

  const deployToBlockchain = async () => {
    await callSmartContract(
      'Create',
      () => {
        if (contract.status !== 'accepted') {
          setError('Contract is not accepted yet!')
          return false
        }

        return true
      },
      () => {
        const contractPrice = parseEther(contract.price)

        return contractFactory.createContract(
          contract.id,
          contract.performer_address,
          contractPrice,
          contract.customer_id,
          contract.performer_id
        )
      }
    )
  }

  const setAsDeployedOnBackend = () => {
    callBackend(
      () => {
        if (contractStatus !== 'Created') {
          setError('The contract has not been created on the blockchain')
          return false
        }

        if (isEmptyString(contractAddress)) {
          setError(
            'Unable to get contract address from blockchain. Refresh the page'
          )
          return false
        }

        return true
      },
      () => {
        return deployContract(token, contract.id, contractAddress)
      }
    )
  }

  const fundOnBlockchain = async () => {
    await callSmartContract(
      'Fund',
      () => {
        if (contractStatus !== 'Signed') {
          setError('The contract has not been signed on the blockchain')
          return false
        }

        if (accountBalance <= contract.price) {
          setError(
            'You do not have enough tokens to fund the contract. Required: ' +
              contract.price +
              ' ' +
              coinSymbol
          )
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

        return _contract.fund({
          value: parseEther(contract.price),
        })
      }
    )
  }

  const setAsFundedOnBackend = () => {
    callBackend(
      () => {
        if (contractStatus !== 'Funded') {
          setError('The contract has not been funded on the blockchain')
          return false
        }

        return true
      },
      () => {
        return fundContract(token, contract.id)
      }
    )
  }

  const approveOnBlockchain = async () => {
    await callSmartContract(
      'Approve',
      () => {
        if (contractStatus !== 'Funded') {
          setError('The contract has not been funded on the blockchain')
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

        return _contract.approve()
      }
    )
  }

  const setAsApprovedOnBackend = () => {
    callBackend(
      () => {
        if (contractStatus !== 'Approved') {
          setError('The contract has not been approved on the blockchain')
          return false
        }

        return true
      },
      () => {
        return approveContract(token, contract.id)
      }
    )
  }

  const convertToEth = (value) => {
    return ethers.utils.formatEther(value.toString())
  }

  const parseEther = (value) => {
    return ethers.utils.parseEther(parseFloat(value.toString()).toString())
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
          me="customer"
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
              <WhatIsNextMessage>
                <p>
                  At this moment we are waiting for the contract to be accepted
                  by the contractor.
                  <br />
                  After this you will be able to create the contract on
                  blockchain.
                </p>
              </WhatIsNextMessage>
            )}

            {currentStatus === 'accepted' && (
              <>
                {contractStatus === 'Created' ? (
                  <>
                    <Message positive icon>
                      <Icon name="file code" />

                      <Message.Content>
                        <Message.Header>
                          Smart Contract has been successfully created on
                          blockchain!
                        </Message.Header>

                        <Divider />

                        <p>
                          Starting from now all will be managed by your Smart
                          Contract code.
                          <br />
                          Address on blockchain:{' '}
                          <a
                            href={`${blockchainViewAddressURL}/${contractAddress}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {contractAddress}
                          </a>
                          .
                          <br />
                          Please click &quot;Update Contract Status&quot; to
                          send updated contract to the contractor.
                        </p>
                      </Message.Content>
                    </Message>

                    <UpdateContractStatusButton
                      onClick={setAsDeployedOnBackend}
                    />
                  </>
                ) : (
                  <WalletWrapper
                    walletAddressToCompareWith={contract.customer_address}
                  >
                    <>
                      <Message icon>
                        <Icon name="chat" />

                        <Message.Content>
                          <Message.Header>
                            Smart Contract has been successfully accepted!
                          </Message.Header>

                          <Divider />

                          <p>
                            Please click &quot;Deliver to blockchain&quot; to
                            create a Smart Contract.
                            <br />
                            When MetaMask wallet will appear on your screen,
                            please confirm the transaction.
                            <br />
                            You have to pay gas fee for this transaction.
                          </p>
                        </Message.Content>
                      </Message>

                      <ExecuteBlockchainTransactionButton
                        content="Deliver to blockchain"
                        onClick={deployToBlockchain}
                      />
                    </>
                  </WalletWrapper>
                )}
              </>
            )}

            {currentStatus === 'deployed' && (
              <>
                {contractStatus === 'Signed' ? (
                  <WhatIsNextMessage>
                    <p>
                      Smart Contract has been signed on blockchain.
                      <br />
                      At this moment we are waiting for the contract to be
                      updated by the contractor.
                      <br />
                      After this you will be able to fund the Smart Contract.
                    </p>
                  </WhatIsNextMessage>
                ) : (
                  <WhatIsNextMessage>
                    <p>
                      At this moment we are waiting for the Smart Contract to be
                      signed on the blockchain by the contractor.
                      <br />
                      After this you will be able to fund the Smart Contract.
                    </p>
                  </WhatIsNextMessage>
                )}
              </>
            )}

            {currentStatus === 'signed' && (
              <>
                {contractStatus === 'Funded' ? (
                  <>
                    <Message positive icon>
                      <Icon name="money" />

                      <Message.Content>
                        <Message.Header>
                          Smart Contract has been successfully funded!
                        </Message.Header>

                        <Divider />

                        <p>
                          Please click &quot;Update Contract Status&quot; to
                          send updated contract to the contractor.
                          <br />
                          After this step the contractor will be able to start
                          working.
                        </p>
                      </Message.Content>
                    </Message>

                    <UpdateContractStatusButton
                      onClick={setAsFundedOnBackend}
                    />
                  </>
                ) : (
                  <>
                    {accountBalance > contract.price ? (
                      <WalletWrapper
                        walletAddressToCompareWith={contract.customer_address}
                      >
                        <>
                          <Message icon>
                            <Icon name="money" />

                            <Message.Content>
                              <Message.Header>
                                Smart Contract is ready to be funded by
                                {` ${contract.price} ${coinSymbol}`}
                              </Message.Header>

                              <Divider />

                              <p>
                                Please click &quot;Fund Smart Contract&quot; to
                                open MetaMask to confirm transaction.
                                <br />
                                You have to pay gas fee for this transaction.
                                <br />
                                After this step the contractor will be able to
                                start working.
                              </p>
                            </Message.Content>
                          </Message>

                          <ExecuteBlockchainTransactionButton
                            content="Fund Smart Contract"
                            onClick={fundOnBlockchain}
                          />
                        </>
                      </WalletWrapper>
                    ) : (
                      <>
                        <Message negative icon>
                          <Icon name="money" />
                          <Message.Content>
                            <Message.Header>
                              Not enough money to fund a Smart Contract
                            </Message.Header>
                            <p>
                              Your current balance is
                              {`${accountBalance} ${coinSymbol}`} and it is not
                              enough to pay for contract price.
                            </p>
                          </Message.Content>
                        </Message>
                      </>
                    )}
                  </>
                )}
              </>
            )}

            {currentStatus === 'funded' && (
              <>
                {contractStatus === 'Approved' ? (
                  <>
                    <Message icon>
                      <Icon name="warning circle" />

                      <Message.Content>
                        <Message.Header>Pay attention twice!</Message.Header>

                        <Divider />

                        <p>
                          You have allowed withdrawing money for the contractor.
                          <br />
                          At this step you need to confirm the operation. Click
                          &quot;Update Contract Status&quot;.
                        </p>
                      </Message.Content>
                    </Message>

                    <UpdateContractStatusButton
                      onClick={setAsApprovedOnBackend}
                    />
                  </>
                ) : (
                  <WalletWrapper
                    walletAddressToCompareWith={contract.customer_address}
                  >
                    <>
                      <Message icon>
                        <Icon name="warning circle" />

                        <Message.Content>
                          <Message.Header>Pay attention!</Message.Header>

                          <Divider />

                          <p>
                            At this step you can allow contractor to withdraw
                            money from the Smart Contract.
                            <br />
                            Please make sure that you have got the job result
                            from the contractor and you are agree with the final
                            results.
                          </p>

                          <p>
                            If all is good, click &quot;Approve&quot; and
                            confirm the transaction.
                          </p>
                        </Message.Content>
                      </Message>

                      <ExecuteBlockchainTransactionButton
                        content="Approve"
                        onClick={approveOnBlockchain}
                      />
                    </>
                  </WalletWrapper>
                )}
              </>
            )}

            {(currentStatus === 'approved' ||
              currentStatus === 'completed') && (
              <Message positive icon>
                <Icon name="fire" />

                <Message.Content>
                  <Message.Header>Congratulations!</Message.Header>

                  <Divider />

                  <p>We hope you have enjoyed working with this freelancer!</p>

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
