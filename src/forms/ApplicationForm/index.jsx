import * as Sentry from '@sentry/nextjs'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Message, Button, Form } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { createApplication } from '../../lib/api'

export const ApplicationForm = ({ job, application, token, tokenSymbol }) => {
  const router = useRouter()

  const initialFields = {
    comment: application?.comment || '',
    price: application?.price || '',
  }

  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')

  const handleCreateApplication = (e) => {
    e.preventDefault()
    setError('')

    try {
      createApplication(token, job.id, { ...fields })
        .then((result) => {
          if (!result.id) {
            setError(result.message)
          } else {
            router.reload()
          }
        })
        .catch((err) => {
          console.error({ err })

          if (err.message.match(/failed to fetch/i)) {
            Sentry.captureMessage('Server is not available')
            setError('Server is not available')
          } else {
            setError(err?.info?.message || err.message)
          }
        })
    } catch (err) {
      console.error({ err })

      Sentry.captureException(err)
      setError(err.message)
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

      {!application && (
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
                href="https://coinmarketcap.com/currencies/bnb/"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                BNB
              </a>
            </Message.Item>
          </Message.List>
        </Message>
      )}

      <Form onSubmit={handleCreateApplication}>
        <Form.TextArea
          id="comment"
          label="Comment for the customer"
          rows={5}
          required
          value={fields.comment}
          onChange={handleInputChange}
          readOnly={application !== null}
        />

        <Form.Input
          id="price"
          type="number"
          min={0.0}
          step={0.01}
          label={`Your expected service price (${tokenSymbol})`}
          value={fields.price}
          required
          width={4}
          onChange={handleInputChange}
          readOnly={application !== null}
          autoComplete="off"
        />

        <Button content="Publish" primary disabled={application !== null} />
      </Form>
    </>
  )
}
