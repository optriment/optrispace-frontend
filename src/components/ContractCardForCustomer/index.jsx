import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import {
  Message,
  Container,
  Button,
  Header,
  Grid,
  Segment,
  Step,
} from 'semantic-ui-react'
import { approveContract, deployContract } from '../../lib/api'
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

export const ContractCardForCustomer = ({ contract, token, currencyLabel }) => {
  const router = useRouter()

  const {
    isLoading: isLoadingWeb3,
    isWalletInstalled,
    isCorrectNetwork,
    connectWallet,
    currentAccount,
    accountBalance,
    contractFactory, // FIXME: Rename to contractFactoryContract
    signer,
    isWalletReady,
    blockchainViewAddressURL,
  } = useContext(Web3Context)

  const [error, setError] = useState(undefined)

  const [txLoading, setTxLoading] = useState(false)
  const [txStatus, setTxStatus] = useState('')

  const [contractAddress, setContractAddress] = useState('')
  const [contractBalance, setContractBalance] = useState('')
  const [isContractDeployed, setIsContractDeployed] = useState(false)
  const [isContractFunded, setIsContractFunded] = useState(false)

  const getContractFromBlockchain = async () => {
    const _contractOnBlockchain = await contractFactory.getContractById(
      contract.id
    )

    return _contractOnBlockchain
  }

  const deployToBlockchain = async () => {
    setTxLoading(true)
    setTxStatus('Creating Smart Contract on blockchain...')
    setError(null)

    try {
      contractFactory.on('ContractDeployed', (_address, _contractId) => {
        if (_contractId === contract.id) {
          setContractAddress(_address)

          // TODO: По идее здесь надо бы отправить на бэкенд информацию с адресом контракта
        }
      })

      const contractPrice = ethers.utils.parseEther(
        parseFloat(contract.price).toString()
      )

      let createContractTx = await contractFactory.createContract(
        contract.id,
        contract.performer_address,
        contractPrice,
        contract.customer.id,
        contract.performer.id,
        contract.title,
        contract.description
      )

      setTxStatus('Waiting for transaction hash...')

      await createContractTx.wait()

      router.reload()
    } catch (err) {
      console.error({ err })
      setError(
        'Unable to deploy contract to blockchain: ' +
          (err?.data?.message || err?.message || err)
      )
    } finally {
      setTxStatus('')
      setTxLoading(false)
    }
  }

  const fundContract = async () => {
    if (accountBalance < contract.price) {
      setError('You do not have enough tokens to fund the contract')
      return
    }

    setTxLoading(true)
    setTxStatus('Funding Smart Contract...')
    setError(null)

    try {
      const _contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      )

      _contract.on('ContractFunded', (_contractId) => {
        if (_contractId === contract.id) {
          setIsContractFunded(true)
        }
      })

      const fundTx = await _contract.fund({
        value: ethers.utils.parseEther(contract.price.toString()),
      })

      setTxStatus('Waiting for transaction hash...')

      await fundTx.wait()

      router.reload()
    } catch (err) {
      console.error({ err })
      setError(
        'Unable to fund contract: ' + (err.data?.message || err?.message || err)
      )
    } finally {
      setTxStatus('')
      setTxLoading(false)
    }
  }

  const deployToBackend = async () => {
    try {
      await deployContract(token, contract.id, contractAddress)
      router.reload()
    } catch (err) {
      console.error({ err })
      setError(err)
    }
  }

  const approve = async () => {
    setTxLoading(true)
    setTxStatus('Approving contract...')
    setError(null)

    try {
      const _contract = new ethers.Contract(
        contract.contract_address,
        contractABI,
        signer
      )

      let approveTx = await _contract.approve()
      await approveTx.wait()

      setTxStatus('Updating status...')

      await approveContract(token, contract.id)

      router.reload()
    } catch (err) {
      console.error({ err })
      setError(
        'Unable to complete contract: ' +
          (err.data?.message || err?.message || err)
      )
      throw err
    } finally {
      setTxStatus('')
      setTxLoading(false)
    }
  }

  const convertToEth = (value) => {
    return ethers.utils.formatEther(value.toString())
  }

  useEffect(() => {
    if (!isWalletReady) {
      return
    }

    setTxLoading(true)
    setTxStatus('Requesting contract from blockchain...')
    setError(null)

    getContractFromBlockchain()
      .then((_contractOnBlockchain) => {
        setIsContractDeployed(true)
        setContractAddress(_contractOnBlockchain[0])

        const _contractBalance = convertToEth(_contractOnBlockchain[1])
        const _contractPrice = convertToEth(_contractOnBlockchain[5])

        setContractBalance(_contractBalance)
        setIsContractFunded(_contractBalance >= _contractPrice)
      })
      .catch((err) => {
        if (err.reason !== 'Contract does not exist') {
          console.error({ err })

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
    sent: 4,
    approved: 5,
    completed: 6,
  }

  const currentStep = statuses[currentStatus] + 1

  return (
    <>
      <Header as="h1">{contract.title}</Header>

      {isWalletInstalled && isCorrectNetwork && currentAccount === '' && (
        <Segment>
          <ConnectWallet connectWallet={connectWallet} />
        </Segment>
      )}

      <Step.Group ordered width={5} fluid>
        <Step completed>
          <Step.Content>
            <Step.Title>Created</Step.Title>
            <Step.Description>Me</Step.Description>
          </Step.Content>
        </Step>

        <Step
          active={currentStatus === 'created'}
          completed={currentStep > statuses['accepted']}
          disabled={currentStep < statuses['accepted']}
        >
          <Step.Content>
            <Step.Title>
              {currentStep > statuses['accepted'] ? 'Accepted' : 'Accept'}
            </Step.Title>
            <Step.Description>Performer</Step.Description>
          </Step.Content>
        </Step>

        <Step
          active={currentStatus === 'accepted'}
          completed={currentStep > statuses['deployed']}
          disabled={currentStep < statuses['deployed']}
        >
          <Step.Content>
            <Step.Title>
              {currentStep > statuses['deployed'] ? 'Funded' : 'Deploy & Fund'}
            </Step.Title>
            <Step.Description>Me</Step.Description>
          </Step.Content>
        </Step>

        <Step
          active={currentStatus === 'deployed'}
          completed={currentStep > statuses['sent']}
          disabled={currentStep < statuses['sent']}
        >
          <Step.Content>
            <Step.Title>
              {currentStep > statuses['sent']
                ? 'Review Requested'
                : 'In Progress'}
            </Step.Title>
            <Step.Description>Performer</Step.Description>
          </Step.Content>
        </Step>

        <Step
          active={currentStatus === 'sent'}
          completed={currentStep > statuses['approved']}
          disabled={currentStep < statuses['approved']}
        >
          <Step.Content>
            <Step.Title>
              {currentStep > statuses['approved'] ? 'Approved' : 'Approve'}
            </Step.Title>
            <Step.Description>Me</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>

      {isLoadingWeb3 || txLoading ? (
        <JustOneSecondBlockchain message={txStatus !== '' && txStatus} />
      ) : (
        <>
          {currentStatus === 'created' && (
            <Message header="Waiting for the accepting of the contract" />
          )}

          {currentStatus === 'accepted' && (
            <>
              {isContractDeployed ? (
                <Segment basic textAlign="right">
                  <a
                    href={`${blockchainViewAddressURL}/${contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button>Open contract…</Button>
                  </a>

                  {isContractFunded ? (
                    <Button
                      primary
                      content="Set as funded"
                      labelPosition="left"
                      icon="ship"
                      onClick={deployToBackend}
                    />
                  ) : (
                    <Button
                      primary
                      content="Fund Smart Contract"
                      labelPosition="left"
                      icon="money"
                      onClick={fundContract}
                      disabled={accountBalance < contract.price}
                    />
                  )}
                </Segment>
              ) : (
                <Segment basic textAlign="right">
                  <Button
                    primary
                    content="Deploy to blockchain"
                    labelPosition="left"
                    icon="ship"
                    onClick={deployToBlockchain}
                  />
                </Segment>
              )}
            </>
          )}

          {currentStatus === 'sent' && (
            <Segment basic textAlign="right">
              <Button
                primary
                content="Confirm & Complete Contract"
                labelPosition="left"
                icon="check"
                onClick={approve}
              />
            </Segment>
          )}
        </>
      )}

      <Grid stackable verticalAlign="top">
        {error && (
          <Grid.Row>
            <Grid.Column>
              <ErrorWrapper header="Failed to perform action" error={error} />
            </Grid.Column>
          </Grid.Row>
        )}

        <Grid.Row>
          <Grid.Column width={10}>
            <Segment>
              <Container text fluid textAlign="justified">
                <FormattedDescription description={contract.description} />
              </Container>
            </Segment>
          </Grid.Column>

          <Grid.Column width={6}>
            <ContractCardSidebar
              contract={contract}
              currencyLabel={currencyLabel}
              blockchainViewAddressURL={blockchainViewAddressURL}
              contractBalance={contractBalance}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
