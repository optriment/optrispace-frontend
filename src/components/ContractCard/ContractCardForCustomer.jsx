import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import {
  Message,
  Container,
  Button,
  Divider,
  Grid,
  Segment,
  Step,
} from 'semantic-ui-react'
import { approveContract, deployContract } from '../../lib/api'
import ErrorWrapper from '../ErrorWrapper'

import TitleDescription from './TitleDescription'
import Sidebar from './Sidebar'
import { ethers } from 'ethers'
import contractABI from '../../../contracts/Contract.json'
import Web3Context from '../../context/web3-context'
import WalletIsNotInstalled from '../WalletIsNotInstalled'
import JustOneSecond from '../JustOneSecond'
import WrongBlockchainNetwork from '../WrongBlockchainNetwork'
import ConnectWallet from '../ConnectWallet'

export default function ContractCardForCustomer({ contract, token }) {
  const router = useRouter()

  const {
    isLoading: isLoadingWeb3,
    isWalletInstalled,
    isWalletConnected,
    isCorrectNetwork,
    connectWallet,
    currentAccount,
    contractFactory, // FIXME: Rename to contractFactoryContract
    token: tokenContract,
    tokenSymbol,
    tokenDecimals,
    signer,
  } = useContext(Web3Context)

  const [error, setError] = useState(undefined)

  const [txLoading, setTxLoading] = useState(false)
  const [txStatus, setTxStatus] = useState('')

  const [deployedContractAddress, setDeployedContractAddress] = useState('')
  const [isContractFunded, setIsContractFunded] = useState(false)

  const getDeployedContractAddress = async () => {
    setTxLoading(true)
    setTxStatus('Requesting contract status...')
    setError(null)

    let contractAddress = ''

    try {
      const contractOnBlockchain = await contractFactory.getContractById(
        contract.id
      )

      contractAddress = contractOnBlockchain[0]
    } catch (err) {
      console.error({ err })

      if (err.reason !== 'Contract does not exist') {
        throw err
      }
    } finally {
      setTxStatus('')
      setTxLoading(false)
    }

    return contractAddress
  }

  const deployToBlockchain = async () => {
    setTxLoading(true)
    setError(null)

    try {
      setTxStatus('Subscribing to events...')

      contractFactory.on('ContractCreated', (_address, _contractId) => {
        if (_contractId === contract.id) {
          setDeployedContractAddress(_address)

          // TODO: По идее здесь надо бы отправить на бэкенд информацию с адресом контракта
        }
      })

      setTxStatus('Creating Smart Contract on blockchain...')

      const contractPriceMultiplied =
        parseFloat(contract.price) * 10 ** tokenDecimals

      let createContractTx = await contractFactory.createContract(
        contract.id,
        contract.performer_address,
        contractPriceMultiplied,
        contract.customer.id,
        contract.performer.id,
        contract.title,
        contract.description
      )

      setTxStatus('Waiting for transaction hash...')

      await createContractTx.wait()
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

  const checkIsSmartContractFunded = async () => {
    setTxLoading(true)
    setTxStatus('Checking is Smart Contract funded...')
    setError(null)

    let isFunded

    try {
      const contractOnBlockchain = await contractFactory.getContractById(
        contract.id
      )

      const contractBalance = ethers.BigNumber.from(contractOnBlockchain[1])

      isFunded = contractBalance >= contract.price
    } catch (err) {
      console.error({ err })
      throw err
    } finally {
      setTxStatus('')
      setTxLoading(false)
    }

    return isFunded
  }

  // TODO: Надо дополнительно проверять, разрешил ли заказчик списывать деньги с его счёта
  const allowSmartContractToTransferTokens = async () => {
    setError(null)

    const price = parseFloat(contract.price) * 10 ** tokenDecimals

    try {
      let approveTx = await tokenContract.approve(
        deployedContractAddress,
        price
      )

      await approveTx.wait()
    } catch (err) {
      console.error({ err })
      throw err
    }
  }

  const fundContract = async () => {
    setTxLoading(true)
    setError(null)

    try {
      setTxStatus('Allowing Smart Contract to transfer tokens...')

      await allowSmartContractToTransferTokens()

      const _contract = new ethers.Contract(
        deployedContractAddress,
        contractABI,
        signer
      )

      setTxStatus('Subscribing to events...')

      _contract.on('ContractFunded', (_contractId) => {
        if (_contractId === contract.id) {
          setIsContractFunded(true)
        }
      })

      setTxStatus('Funding Smart Contract...')

      let fundTx = await _contract.fund()

      setTxStatus('Waiting for transaction hash...')

      await fundTx.wait()
    } catch (err) {
      console.error({ err })
      setError(
        'Unable to fund contract: ' +
          (err?.data?.message || err?.message || err)
      )
    } finally {
      setTxStatus('')
      setTxLoading(false)
    }
  }

  const deployToBackend = async () => {
    try {
      await deployContract(token, contract.id, deployedContractAddress)
      router.reload()
    } catch (err) {
      console.error({ err })
      setError(err)
    }
  }

  const approve = async () => {
    setTxLoading(true)
    setError(null)

    try {
      setTxStatus('Approving contract...')

      const _contract = new ethers.Contract(
        deployedContractAddress,
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
      throw err
    } finally {
      setTxStatus('')
      setTxLoading(false)
    }
  }

  // NOTE: Здесь идём в блокчейн только в случае, если у нас нет адреса задеплоенного контракта
  useEffect(() => {
    if (!isWalletInstalled) {
      return
    }

    if (!isCorrectNetwork) {
      return
    }

    if (!isWalletConnected) {
      return
    }

    if (deployedContractAddress !== '') {
      return
    }

    getDeployedContractAddress()
      .then((address) => {
        if (address !== '') {
          console.log(`Found deployed contract with address: ${address}`)
          setDeployedContractAddress(address)
        } else {
          console.log(`Contract does not exist on blockchain yet`)
        }
      })
      .catch((err) => {
        console.error({ err })
        setError(err.reason)
      })
  }, [
    isWalletInstalled,
    isWalletConnected,
    isCorrectNetwork,
    deployedContractAddress,
  ])

  useEffect(() => {
    if (deployedContractAddress === '') {
      return
    }

    checkIsSmartContractFunded()
      .then((funded) => {
        if (funded) {
          setIsContractFunded(true)
        } else {
          console.log('Contract is not fully funded')
        }
      })
      .catch((err) => {
        console.error({ err })
        setError(err.reason)
      })
  }, [deployedContractAddress])

  if (!isWalletInstalled) {
    return <WalletIsNotInstalled />
  }

  if (!isCorrectNetwork) {
    return <WrongBlockchainNetwork router={router} />
  }

  if (currentAccount === '') {
    return <ConnectWallet connectWallet={connectWallet} />
  }

  if (isLoadingWeb3) {
    return <JustOneSecond />
  }

  const statuses = {
    created: 1,
    accepted: 2,
    deployed: 3,
    sent: 4,
    approved: 5,
    ended: 6,
  }

  const currentStep = statuses[contract.status] + 1

  return (
    <>
      <Segment basic>
        <Step.Group ordered width={5} fluid>
          <Step completed>
            <Step.Content>
              <Step.Title>
                {currentStep > statuses['created'] ? 'Created' : 'Create'}
              </Step.Title>
              <Step.Description>Me</Step.Description>
            </Step.Content>
          </Step>

          <Step
            active={contract.status === 'created'}
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
            active={contract.status === 'accepted'}
            completed={currentStep > statuses['deployed']}
            disabled={currentStep < statuses['deployed']}
          >
            <Step.Content>
              <Step.Title>
                {currentStep > statuses['deployed']
                  ? 'Funded'
                  : 'Deploy & Fund'}
              </Step.Title>
              <Step.Description>Me</Step.Description>
            </Step.Content>
          </Step>

          <Step
            active={contract.status === 'deployed'}
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
            active={contract.status === 'sent'}
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
      </Segment>

      <Divider hidden />

      <Grid container stackable verticalAlign="top">
        <Grid.Row>
          <Grid.Column>
            {error && (
              <ErrorWrapper header="Failed to perform action" error={error} />
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <TitleDescription job={contract} />
          </Grid.Column>

          <Grid.Column width={6}>
            {contract.status === 'accepted' && (
              <Container textAlign="right">
                {deployedContractAddress === '' ? (
                  <Button
                    primary
                    content="Deploy to blockchain"
                    labelPosition="left"
                    icon="ship"
                    disabled={
                      !isCorrectNetwork ||
                      deployedContractAddress !== '' ||
                      txLoading ||
                      isLoadingWeb3
                    }
                    onClick={deployToBlockchain}
                    loading={txLoading || isLoadingWeb3}
                  />
                ) : (
                  <>
                    <a
                      href={`https://testnet.bscscan.com/address/${deployedContractAddress}`}
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
                        loading={txLoading}
                        disabled={txLoading}
                      />
                    ) : (
                      <Button
                        primary
                        content="Fund Smart Contract"
                        labelPosition="left"
                        icon="money"
                        onClick={fundContract}
                        loading={txLoading}
                        disabled={txLoading}
                      />
                    )}
                  </>
                )}
              </Container>
            )}

            {contract.status === 'sent' && (
              <Container textAlign="right">
                <Button
                  primary
                  content="Confirm & Complete Contract"
                  labelPosition="left"
                  icon="check"
                  disabled={txLoading || isLoadingWeb3}
                  onClick={approve}
                  loading={txLoading || isLoadingWeb3}
                />
              </Container>
            )}

            {txStatus && txStatus !== '' && (
              <Message
                header="Blockchain Status"
                content={txStatus}
                size="tiny"
              />
            )}

            <Sidebar contract={contract} tokenSymbol={tokenSymbol} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}