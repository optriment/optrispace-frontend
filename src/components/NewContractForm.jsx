import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import {
  Button,
  Form,
  Icon,
  Divider,
  TextArea,
  Message,
} from 'semantic-ui-react'

import { createContract } from '../lib/api'
import { isEmptyString } from '../lib/validators'
import ErrorWrapper from './ErrorWrapper'
import Web3Context from '../context/web3-context'
import WalletIsNotInstalled from './WalletIsNotInstalled'
import JustOneSecond from './JustOneSecond'
import ConnectWallet from './ConnectWallet'
import WrongBlockchainNetwork from './WrongBlockchainNetwork'

export default function NewContractForm({ job, token, application }) {
  const router = useRouter()

  const initialFields = {
    title: job.title,
    description: job.description,
    price: application.price,
  }

  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState(undefined)
  const [hideNotice, setHideNotice] = useState(false)
  const [agreedTo, setAgreedTo] = useState(false)
  const [formFilled, setFormFilled] = useState(false)

  const {
    isLoading: isLoadingWeb3,
    isWalletInstalled,
    isCorrectNetwork,
    connectWallet,
    currentAccount,
    tokenSymbol,
  } = useContext(Web3Context)

  const handleCreateContract = async (e) => {
    e.preventDefault()

    try {
      const contract = await createContract(token, {
        applicationId: application.id,
        performerId: application.applicant.id,
        customerAddress: currentAccount,
        ...fields,
      })

      if (!contract.id) {
        setError(contract.message)
      } else {
        router.push(`/contracts/${contract.id}`)
      }
    } catch (err) {
      console.error({ err })
      setError(err)
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
      {error && <ErrorWrapper header="Error occured" error={error} />}

      {!hideNotice && (
        <Message onDismiss={() => setHideNotice(true)}>
          <Icon name="info" />
          Several fields on this form were auto-filled from the{' '}
          <Link href="/jobs/[id]" as={`/jobs/${job.id}`} passHref>
            <a>job offer</a>
          </Link>
          {' and'} performer&apos;s application
        </Message>
      )}

      <Form>
        <Form.Input
          id="title"
          label="Title"
          placeholder=""
          value={fields.title}
          onChange={handleInputChange}
          required
        />

        <Form.Input
          control={TextArea}
          id="description"
          label="Description"
          placeholder=""
          rows={10}
          value={fields.description}
          onChange={handleInputChange}
          required
        />

        <Form.Group>
          <Form.Input
            id="price"
            label={`Price (${tokenSymbol})`}
            placeholder=""
            value={fields.price}
            onChange={handleInputChange}
            required
            width={3}
          />
        </Form.Group>

        <Divider hidden />

        <Form.Checkbox
          label="I agree to the Terms and Conditions"
          checked={agreedTo}
          onClick={() => setAgreedTo(!agreedTo)}
        />

        <Divider hidden />

        <Button
          primary
          type="submit"
          disabled={isLoadingWeb3 || !formFilled}
          onClick={(e) => handleCreateContract(e)}
        >
          Submit
        </Button>
      </Form>
    </>
  )
}
