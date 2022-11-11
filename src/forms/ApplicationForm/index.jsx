import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Message, Button, Form } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { createApplication } from '../../lib/api'
import { errorHandler } from '../../lib/errorHandler'

export const ApplicationForm = ({ job, token, coinSymbol }) => {
  const router = useRouter()

  const initialFields = {
    comment: '',
    price: '',
  }

  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')

  const handleCreateApplication = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await createApplication(token, job.id, { ...fields })

      router.reload()
    } catch (err) {
      console.error({ err })

      setError(errorHandler(err))
    }
  }

  const handleInputChange = (e) => {
    setFields({ ...fields, ...{ [e.target.id]: e.target.value } })
  }

  return (
    <>
      {error !== '' && (
        <ErrorWrapper header="Unable to post an application" error={error} />
      )}

      <Message>
        <Message.Header>Please do not forget:</Message.Header>
        <Message.List>
          <Message.Item>
            Leave your contacts (Telegram, Skype or email) for the customer
          </Message.Item>
          <Message.Item>
            Write descriptive comment about your relevant experience
          </Message.Item>
          <Message.Item>
            The price of your services must be in{' '}
            <a
              href={`https://coinmarketcap.com/currencies/${coinSymbol}/`}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {coinSymbol}
            </a>
          </Message.Item>
        </Message.List>
      </Message>

      <Form onSubmit={handleCreateApplication}>
        <Form.TextArea
          id="comment"
          label="Comment for the customer"
          rows={5}
          required
          value={fields.comment}
          onChange={handleInputChange}
        />

        <Form.Input
          id="price"
          type="number"
          min={0.0}
          step={0.001}
          label={`Your expected service price (${coinSymbol})`}
          value={fields.price}
          required
          width={5}
          onChange={handleInputChange}
          autoComplete="off"
        />

        <Button content="Publish" primary />
      </Form>
    </>
  )
}
