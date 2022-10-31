import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Header, Button, Form, TextArea } from 'semantic-ui-react'
import { createJob } from '../../lib/api'
import { isEmptyString } from '../../lib/validators'
import ErrorWrapper from '../../components/ErrorWrapper'
import { MarkdownIsSupported } from '../../components/MarkdownIsSupported'
import { errorHandler } from '../../lib/errorHandler'

export const NewJobForm = ({ token, coinSymbol }) => {
  const router = useRouter()

  const initialFields = {
    title: '',
    description: '',
    budget: '',
  }
  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')
  const [formFilled, setFormFilled] = useState(false)

  const handleCreateJob = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await createJob(token, { ...fields })

      router.push(`/jobs/${res.id}`)
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
        !isEmptyString(fields.budget)
    )
  }, [fields])

  return (
    <>
      <Header as="h1">Add New Job</Header>

      {error !== '' && (
        <ErrorWrapper header="Unable to create job" error={error} />
      )}

      <Form onSubmit={handleCreateJob}>
        <Form.Group>
          <Form.Input
            id="title"
            label="Title"
            placeholder=""
            value={fields.title}
            onChange={handleInputChange}
            required
            width={12}
          />

          <Form.Input
            id="budget"
            type="number"
            min={0.0}
            step={0.01}
            label={`Approx. budget (${coinSymbol})`}
            placeholder=""
            value={fields.budget}
            onChange={handleInputChange}
            width={4}
          />
        </Form.Group>

        <Form.Input
          control={TextArea}
          id="description"
          label="Description"
          placeholder=""
          rows={12}
          value={fields.description}
          onChange={handleInputChange}
          required
        />

        <MarkdownIsSupported />

        <Button content="Publish" primary disabled={!formFilled} />
      </Form>
    </>
  )
}
