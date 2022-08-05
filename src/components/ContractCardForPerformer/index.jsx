import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import {
  Header,
  Button,
  Container,
  Grid,
  Segment,
  Step,
} from 'semantic-ui-react'
import { acceptContract, completeContract, sendContract } from '../../lib/api'
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

export const ContractCardForPerformer = ({
  contract,
  token,
  currencyLabel,
}) => {
  const router = useRouter()

  const {
    isLoading: isLoadingWeb3,
    isWalletInstalled,
    isCorrectNetwork,
    connectWallet,
    currentAccount,
    signer,
    isWalletReady,
    blockchainViewAddressURL,
  } = useContext(Web3Context)

  const [error, setError] = useState(undefined)

  const [txLoading, setTxLoading] = useState(false)
  const [txStatus, setTxStatus] = useState('')
  const [allowedToWithdraw, setAllowedToWithdraw] = useState(false)

  const isWalletRequired = ['created', 'approved'].includes(contract.status)

  const walletReady = isWalletRequired && isWalletReady

  const accept = async () => {
    if (!walletReady) {
      return
    }

    try {
      await acceptContract(token, contract.id, currentAccount)
      router.reload()
    } catch (err) {
      console.error({ err })
      setError(err)
    }
  }

  const send = async () => {
    try {
      await sendContract(token, contract.id)
      router.reload()
    } catch (err) {
      console.error({ err })
      setError(err)
    }
  }

  const requestMoney = async () => {
    if (!walletReady) {
      return
    }

    setTxLoading(true)
    setTxStatus('Requesting money from Smart Contract...')
    setError(null)

    try {
      const _contract = new ethers.Contract(
        contract.contract_address,
        contractABI,
        signer
      )

      let withdrawTx = await _contract.withdraw()
      await withdrawTx.wait()

      const _contractBalance = await _contract.getBalance()

      if (_contractBalance === 0) {
        await completeContract(token, contract.id)
        router.reload()
      }
    } catch (err) {
      console.error({ err })
      setError(
        'Unable to request money: ' + (err.data?.message || err?.message || err)
      )
    } finally {
      setTxStatus('')
      setTxLoading(false)
    }
  }

  useEffect(() => {
    if (!walletReady) {
      return
    }

    if (contract.status !== 'approved') {
      return
    }

    try {
      const checkIsWithdrawable = async () => {
        const _contract = new ethers.Contract(
          contract.contract_address,
          contractABI,
          signer
        )

        try {
          const isClosed = await _contract.isClosed()
          setAllowedToWithdraw(!isClosed)
        } catch (err) {
          console.error({ err })
          setError(err)
        }
      }

      checkIsWithdrawable()
    } catch (err) {
      console.error({ err })
      setError(err.message)
    }
  }, [walletReady, contract, signer])

  const statuses = {
    created: 1,
    accepted: 2,
    deployed: 3,
    sent: 4,
    approved: 5,
    completed: 6,
  }

  const currentStep = statuses[contract.status] + 1

  if (isWalletRequired) {
    if (!isWalletInstalled) {
      return <WalletIsNotInstalled />
    }

    if (!isCorrectNetwork) {
      return <WrongBlockchainNetwork router={router} />
    }
  }

  return (
    <>
      <Header as="h1">{contract.title}</Header>

      {isWalletRequired &&
        isWalletInstalled &&
        isCorrectNetwork &&
        currentAccount === '' && (
          <ConnectWallet connectWallet={connectWallet} />
        )}

      <Step.Group ordered width={5} fluid>
        <Step completed>
          <Step.Content>
            <Step.Title>
              {currentStep > statuses['created'] ? 'Created' : 'Create'}
            </Step.Title>
            <Step.Description>Customer</Step.Description>
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
            <Step.Description>Me</Step.Description>
          </Step.Content>
        </Step>

        <Step
          active={contract.status === 'accepted'}
          completed={currentStep > statuses['deployed']}
          disabled={currentStep < statuses['deployed']}
        >
          <Step.Content>
            <Step.Title>
              {currentStep > statuses['deployed'] ? 'Funded' : 'Fund'}
            </Step.Title>
            <Step.Description>Customer</Step.Description>
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
            <Step.Description>Me</Step.Description>
          </Step.Content>
        </Step>

        <Step
          active={contract.status === 'sent'}
          completed={currentStep > statuses['approved']}
          disabled={currentStep < statuses['approved']}
        >
          <Step.Content>
            <Step.Title>
              {currentStep > statuses['approved'] ? 'Approved' : 'Review'}
            </Step.Title>
            <Step.Description>Customer</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>

      {contract.status === 'created' && !isLoadingWeb3 && !txLoading && (
        <Segment basic textAlign="right">
          <Button
            primary
            content="Accept contract"
            labelPosition="left"
            icon="handshake"
            disabled={!walletReady}
            onClick={accept}
          />
        </Segment>
      )}

      {contract.status === 'deployed' && (
        <Segment basic textAlign="right">
          <a
            href={`${blockchainViewAddressURL}/${contract.contract_address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Open contract…</Button>
          </a>

          <Button
            primary
            content="Request Review"
            labelPosition="left"
            icon="ship"
            onClick={send}
          />
        </Segment>
      )}

      {contract.status === 'approved' &&
        allowedToWithdraw &&
        !isLoadingWeb3 &&
        !txLoading && (
          <Segment basic textAlign="right">
            <Button
              primary
              content="Request Money"
              labelPosition="left"
              icon="money"
              disabled={!walletReady}
              onClick={requestMoney}
            />
          </Segment>
        )}

      {(isLoadingWeb3 || txLoading) && (
        <JustOneSecondBlockchain message={txStatus !== '' && txStatus} />
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
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
