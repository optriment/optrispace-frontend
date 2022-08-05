import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Segment,
  Grid,
  Header,
  Button,
  Form,
  Icon,
  Divider,
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

export const NewContractForm = ({ job, application, token, currencyLabel }) => {
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

  const handleCreateContract = async () => {
    setError('')

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
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={12}>
            <Header as="h1">Add New Contract</Header>
          </Grid.Column>

          <Grid.Column width={4} textAlign="right">
            <Button
              primary
              type="submit"
              labelPosition="left"
              icon="send"
              content="Submit for Review"
              disabled={isLoadingWeb3 || !formFilled}
              onClick={handleCreateContract}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider hidden />

      {error !== '' && (
        <ErrorWrapper header="Unable to create contract" error={error} />
      )}

      {!hideNotice && (
        <Message onDismiss={() => setHideNotice(true)}>
          <Icon name="info" />
          Several fields on this form were auto-filled from the{' '}
          <Link href="/jobs/[id]" as={`/jobs/${job.id}`} passHref>
            <a>job offer</a>
          </Link>
          {' and'} contractor&apos;s application
        </Message>
      )}

      <Segment secondary padded>
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
            rows={15}
            value={fields.description}
            onChange={handleInputChange}
            required
          />

          <Form.Group>
            <Form.Input
              id="price"
              label={`Price (${currencyLabel})`}
              placeholder=""
              value={fields.price}
              onChange={handleInputChange}
              required
              width={3}
            />
          </Form.Group>

          <Form.Checkbox
            label="I agree to the Terms and Conditions"
            checked={agreedTo}
            onClick={() => setAgreedTo(!agreedTo)}
          />
        </Form>
      </Segment>
    </>
  )
}
