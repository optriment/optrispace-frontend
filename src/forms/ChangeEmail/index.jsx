import * as Sentry from '@sentry/nextjs'
import React, { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { SuccessMessage } from '../../components/SuccessMessage'
import { updateEmail } from '../../lib/settings'

export const ChangeEmail = ({ token, id, email }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const initialFields = {
    email: email,
  }

  const [fields, setFields] = useState(initialFields)

  const handleChangeEmail = (e) => {
    e.preventDefault()

    const newEmail = fields.email.trim().toLowerCase()
    if (newEmail === email) {
      return
    }

    setError('')
    setMessage('')
    setIsSubmitting(true)

    try {
      updateEmail(token, id, newEmail)
        .then((res) => {
          if (res.email === newEmail) {
            setMessage('Email successfully changed!')
          } else {
            setError('Something went wrong. Please try again!')
          }
        })
        .catch((err) => {
          console.error({ err })
          setError(err.message)
        })
    } catch (err) {
      console.error({ err })
      Sentry.captureException(err)
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    setFields({
      ...fields,
      ...{ [e.target.id]: e.target.value },
    })
  }

  return (
    <Form size="large" onSubmit={handleChangeEmail}>
      <Segment>
        {error !== '' && (
          <ErrorWrapper header="Unable to change Email" error={error} />
        )}

        {message !== '' && (
          <SuccessMessage
            header="Success!"
            message="Email has been changed successfully"
          />
        )}

        <Form.Input
          id="email"
          fluid
          icon="envelope"
          iconPosition="left"
          placeholder="Email"
          value={fields.email}
          autoComplete="email"
          onChange={handleInputChange}
          required
          type="email"
          pattern="[^ @]*@[^ @]*"
          maxLength={64}
        />

        <Button primary fluid size="large" disabled={isSubmitting}>
          Save
        </Button>
      </Segment>
    </Form>
  )
}
