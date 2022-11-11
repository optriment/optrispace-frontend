import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Header,
  Button,
  Form,
  Icon,
  TextArea,
  Message,
} from 'semantic-ui-react'
import { createContract } from '../../lib/api'
import { isEmptyString } from '../../lib/validators'
import ErrorWrapper from '../../components/ErrorWrapper'
import Web3Context from '../../context/web3-context'
import WalletIsNotInstalled from '../../components/WalletIsNotInstalled'
import JustOneSecond from '../../components/JustOneSecond'
import ConnectWallet from '../../components/ConnectWallet'
import WrongBlockchainNetwork from '../../components/WrongBlockchainNetwork'
import { MarkdownIsSupported } from '../../components/MarkdownIsSupported'
import { errorHandler } from '../../lib/errorHandler'

export const NewContractForm = ({ job, application, token, coinSymbol }) => {
  const router = useRouter()

  const initialFields = {
    title: job.title,
    description: job.description,
    price: application.price,
  }

  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')
  const [hideNotice, setHideNotice] = useState(false)
  const [agreedTo, setAgreedTo] = useState(false)
  const [formFilled, setFormFilled] = useState(false)

  const {
    isLoading: isLoadingWeb3,
    isWalletInstalled,
    isCorrectNetwork,
    connectWallet,
    currentAccount,
  } = useContext(Web3Context)

  const handleCreateContract = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await createContract(token, {
        applicationId: application.id,
        contractorId: application.applicant_id,
        customerAddress: currentAccount,
        ...fields,
      })

      router.push(`/contracts/${res.id}`)
    } catch (err) {
      console.error({ err })

      setError(errorHandler(err))
    }
  }

  const handleInputChange = (e) => {
    setFields({ ...fields, ...{ [e.target.id]: e.target.value } })
  }

  useEffect(() => {
    setFormFilled(
      !isEmptyString(fields.title) &&
        !isEmptyString(fields.description) &&
        !isEmptyString(fields.price) &&
        agreedTo === true
    )
  }, [fields, agreedTo])

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

  return (
    <>
      <Header as="h1">Add New Contract</Header>

      {error !== '' && (
        <ErrorWrapper header="Unable to create contract" error={error} />
      )}

      {!hideNotice && (
        <Message onDismiss={() => setHideNotice(true)}>
          <Icon name="info" />
          Several fields in this form were auto-filled from the{' '}
          <Link href="/jobs/[id]" as={`/jobs/${job.id}`} passHref>
            <a>job card</a>
          </Link>
          {' and'} contractor&apos;s application
        </Message>
      )}

      <Form onSubmit={handleCreateContract}>
        <Form.Input
          id="title"
          label="Title"
          placeholder=""
          value={fields.title}
          onChange={handleInputChange}
          required
        />

        <Form.Group>
          <Form.Input
            label="Contractor"
            placeholder=""
            value={application.applicant_display_name}
            readOnly
            width={4}
          />

          <Form.Input
            label="Wallet Address"
            placeholder=""
            value={application.applicant_ethereum_address}
            readOnly
            width={6}
          />
        </Form.Group>

        <Form.Input
          control={TextArea}
          id="description"
          label="Description"
          placeholder=""
          rows={12}
          value={fields.description}
          onChange={handleInputChange}
          required
        />

        <MarkdownIsSupported />

        <Form.Input
          id="price"
          type="number"
          min={0.0}
          step={0.001}
          label={`Price (${coinSymbol})`}
          placeholder=""
          value={fields.price}
          onChange={handleInputChange}
          required
          width={3}
        />

        <Form.Checkbox
          label="I agree to the Terms and Conditions"
          checked={agreedTo}
          onClick={() => setAgreedTo(!agreedTo)}
        />

        <Button
          primary
          type="submit"
          content="Create"
          disabled={isLoadingWeb3 || !formFilled}
        />
      </Form>
    </>
  )
}
