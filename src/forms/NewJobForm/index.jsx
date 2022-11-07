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

      localStorage.removeItem('jobTitle')
      localStorage.removeItem('jobBudget')
      localStorage.removeItem('jobDescription')

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

  const setLocalJobTitle = (jobTitle) => {
    localStorage.setItem('jobTitle', jobTitle)
  }

  const setLocalJobBudget = (jobBudget) => {
    localStorage.setItem('jobBudget', jobBudget)
  }

  const setLocalJobDescription = (jobDescription) => {
    localStorage.setItem('jobDescription', jobDescription)
  }

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
            defaultValue={localStorage.getItem('jobTitle') ?? ''}
            onChange={(event) => {
              handleInputChange(event)
              setLocalJobTitle(event.target.value)
            }}
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
            defaultValue={localStorage.getItem('jobBudget') ?? ''}
            onChange={(event) => {
              handleInputChange(event)
              setLocalJobBudget(event.target.value)
            }}
            width={4}
          />
        </Form.Group>

        <Form.Input
          control={TextArea}
          id="description"
          label="Description"
          placeholder=""
          rows={12}
          defaultValue={localStorage.getItem('jobDescription') ?? ''}
          onChange={(event) => {
            handleInputChange(event)
            setLocalJobDescription(event.target.value)
          }}
          required
        />

        <MarkdownIsSupported />

        <Button content="Publish" primary disabled={!formFilled} />
      </Form>
    </>
  )
}
