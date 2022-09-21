import * as Sentry from '@sentry/nextjs'
import React, { useState } from 'react'
import { Divider, Message, Button, Form } from 'semantic-ui-react'
import ErrorWrapper from '../../../components/ErrorWrapper'
import { sendMarketingForm } from '../../../lib/marketing'
import { isEmptyString } from '../../../lib/validators'

export const SidebarRegistrationForm = () => {
  const initialFields = {
    email: '',
  }
  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')

  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleInputChange = (e) => {
    setFields({ ...fields, ...{ [e.target.id]: e.target.value } })
  }

  const handleCheckboxChange = (e) => {
    setFields({ ...fields, ...{ [e.target.id]: e.target.checked } })
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
      sendMarketingForm('sidebar_registration_form', fields)
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

      <Form onSubmit={handleFormSubmit} success={isSubscribed}>
        {isSubscribed && (
          <Message
            success
            header="Thank you!"
            content="You're signed up for the updates"
          />
        )}

        <Form.Input
          id="email"
          type="email"
          placeholder="me@domain.tld"
          value={fields.email}
          onChange={handleInputChange}
          required
        />

        <Form.Field>
          <label>What sort of jobs are you interested in:</label>
        </Form.Field>

        <Form.Checkbox
          id="interest_software_development"
          label="Software Development"
          onChange={handleCheckboxChange}
          checked={fields.interest_software_development}
        />

        <Form.Checkbox
          id="interest_design_illustrations"
          label="Design/Illustrations"
          onChange={handleCheckboxChange}
          checked={fields.interest_design_illustrations}
        />

        <Form.Checkbox
          id="interest_content_management"
          label="Content Management"
          onChange={handleCheckboxChange}
          checked={fields.interest_content_management}
        />

        <Form.Checkbox
          id="interest_copywriting"
          label="Copywriting"
          onChange={handleCheckboxChange}
          checked={fields.interest_copywriting}
        />

        <Form.Checkbox
          id="interest_translations"
          label="Translations"
          onChange={handleCheckboxChange}
          checked={fields.interest_translations}
        />

        <Form.Checkbox
          id="interest_pm_po"
          label="PM/PO"
          onChange={handleCheckboxChange}
          checked={fields.interest_pm_po}
        />

        <Form.Checkbox
          id="interest_other"
          label="Other"
          onChange={handleCheckboxChange}
          checked={fields.interest_other}
        />

        <Divider />

        <Button
          size="large"
          type="submit"
          primary
          disabled={isEmptyString(fields.email)}
        >
          Get Updates!
        </Button>
      </Form>
    </>
  )
}
