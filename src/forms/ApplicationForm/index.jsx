import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { createApplication } from '../../lib/api'

export const ApplicationForm = ({ job, application, token, currencyLabel }) => {
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
          setError(err)
        })
    } catch (err) {
      console.error({ err })
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
          label={`Your price (${currencyLabel})`}
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
