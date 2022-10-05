import * as Sentry from '@sentry/nextjs'
import React, { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { SuccessMessage } from '../../components/SuccessMessage'
import { updateDisplayName } from '../../lib/settings'
import { isEmptyString } from '../../lib/validators'

export const ChangeDisplayName = ({ token, id, displayName }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const initialFields = {
    display_name: displayName,
  }

  const [fields, setFields] = useState(initialFields)

  const handleChangeDisplayName = (e) => {
    e.preventDefault()

    if (isEmptyString(fields.display_name)) {
      setError('You can not set empty Display Name')
      return
    }

    setError('')
    setMessage('')
    setIsSubmitting(true)

    try {
      updateDisplayName(token, id, fields.display_name)
        .then((res) => {
          if (res.display_name === fields.display_name.trim()) {
            setMessage('Display Name successfully changed!')
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
    setFields({ ...fields, ...{ [e.target.id]: e.target.value } })
  }

  return (
    <>
      <Form size="large" onSubmit={handleChangeDisplayName}>
        <Segment>
          {error !== '' && (
            <ErrorWrapper
              header="Unable to change Display Name"
              error={error}
            />
          )}

          {message !== '' && (
            <SuccessMessage
              header="Success!"
              message="Display Name has been changed successfully"
            />
          )}

          <Form.Input
            id="display_name"
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Display Name"
            value={fields.display_name}
            autoComplete="name"
            onChange={handleInputChange}
            required
            maxLength={64}
          />

          <Button primary fluid size="large" disabled={isSubmitting}>
            Save
          </Button>
        </Segment>
      </Form>
    </>
  )
}
