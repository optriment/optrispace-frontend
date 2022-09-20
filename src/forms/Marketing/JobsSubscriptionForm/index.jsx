import * as Sentry from '@sentry/nextjs'
import React, { useState } from 'react'
import { Message, Button, Form } from 'semantic-ui-react'
import ErrorWrapper from '../../../components/ErrorWrapper'
import { sendMarketingForm } from '../../../lib/marketing'
import { isEmptyString } from '../../../lib/validators'

export const JobsSubscriptionForm = () => {
  const initialFields = {
    email: '',
    messenger: '',
  }
  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')

  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleInputChange = (e) => {
    setFields({ ...fields, ...{ [e.target.id]: e.target.value } })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    if (isEmptyString(fields.email)) {
      setError('Email is empty')
      return
    }

    setError('')
    setIsSubscribed(false)

    try {
      sendMarketingForm('subscription_form_between_jobs', fields)
        .then(() => {
          setIsSubscribed(true)
        })
        .catch((err) => {
          console.error({ err })
          Sentry.captureException(err)
          setError(err.message)
        })
    } catch (err) {
      console.error({ err })
      Sentry.captureException(err)
      setError(err.message)
    }
  }

  return (
    <>
      {error !== '' && (
        <ErrorWrapper header="Unable to subscribe" error={error} />
      )}

      <Form size="large" onSubmit={handleFormSubmit} success={isSubscribed}>
        <Form.Input
          id="email"
          type="email"
          label="Your Email"
          placeholder="me@domain.tld"
          value={fields.email}
          onChange={handleInputChange}
          required
        />

        <Form.Input
          id="messenger"
          label="Your Messenger"
          placeholder="Telegram, Skype, Slack, Discord, etc."
          value={fields.messenger}
          onChange={handleInputChange}
        />

        {isSubscribed && (
          <Message
            success
            header="Thank you!"
            content="You're signed up for the updates"
          />
        )}

        <Button
          size="large"
          type="submit"
          primary
          disabled={isEmptyString(fields.email)}
        >
          Stay In Touch!
        </Button>
      </Form>
    </>
  )
}
