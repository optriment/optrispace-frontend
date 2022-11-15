import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Header, Grid, Button, Form, TextArea } from 'semantic-ui-react'
import { createContract } from '../../lib/api'
import { isEmptyString } from '../../lib/validators'
import ErrorWrapper from '../../components/ErrorWrapper'
import Web3Context from '../../context/web3-context'
import WalletIsNotInstalled from '../../components/WalletIsNotInstalled'
import JustOneSecond from '../../components/JustOneSecond'
import ConnectWallet from '../../components/ConnectWallet'
import WrongBlockchainNetwork from '../../components/WrongBlockchainNetwork'
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
      {error !== '' && (
        <ErrorWrapper header="Unable to create contract" error={error} />
      )}

      <Form onSubmit={handleCreateContract}>
        <Grid columns={1}>
          <Grid.Column>
            <Header as="h4">Title:</Header>

            <Form.Input
              id="title"
              placeholder=""
              value={fields.title}
              onChange={handleInputChange}
              required
            />
          </Grid.Column>

          <Grid.Column mobile={16} computer={8}>
            <Header as="h4">Contractor:</Header>

            <Form.Input value={application.applicant_display_name} readOnly />
          </Grid.Column>

          <Grid.Column mobile={16} computer={8}>
            <Header as="h4">Wallet Address:</Header>

            <Form.Input
              value={application.applicant_ethereum_address}
              readOnly
            />
          </Grid.Column>

          <Grid.Column>
            <Header as="h4">Terms &amp; Conditions:</Header>

            <Form.Input
              control={TextArea}
              id="description"
              placeholder=""
              rows={12}
              value={fields.description}
              onChange={handleInputChange}
              required
            />
          </Grid.Column>

          <Grid.Column computer={3} tablet={4} mobile={8}>
            <Header as="h4">{`Price (${coinSymbol}):`}</Header>

            <Form.Input
              id="price"
              type="number"
              min={0.0}
              step={0.001}
              placeholder=""
              value={fields.price}
              onChange={handleInputChange}
              required
            />
          </Grid.Column>

          <Grid.Column>
            <Form.Checkbox
              label="I agree to the Terms and Conditions"
              checked={agreedTo}
              onClick={() => setAgreedTo(!agreedTo)}
            />
          </Grid.Column>

          <Grid.Column>
            <Button
              primary
              type="submit"
              content="Create"
              disabled={isLoadingWeb3 || !formFilled}
            />
          </Grid.Column>
        </Grid>
      </Form>
    </>
  )
}
