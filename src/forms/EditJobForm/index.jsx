import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Header, Button, Form, TextArea } from 'semantic-ui-react'
import { updateJob } from '../../lib/api'
import ErrorWrapper from '../../components/ErrorWrapper'
import { isEmptyString } from '../../lib/validators'
import { MarkdownIsSupported } from '../../components/MarkdownIsSupported'
import { errorHandler } from '../../lib/errorHandler'

export const EditJobForm = ({ job, token, coinSymbol }) => {
  const router = useRouter()

  const initialFields = {
    title: job.title,
    description: job.description,
    budget: job.budget,
  }

  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')
  const [formFilled, setFormFilled] = useState(false)

  const handleEditJob = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await updateJob(token, job.id, { ...fields })

      localStorage.removeItem('editjobTitle')
      localStorage.removeItem('editjobBudget')
      localStorage.removeItem('editjobDescription')

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
    localStorage.setItem(`editjobTitle-${job.id}`, jobTitle)
  }

  const setLocalJobBudget = (jobBudget) => {
    localStorage.setItem(`editjobBudget-${job.id}`, jobBudget)
  }

  const setLocalJobDescription = (jobDescription) => {
    localStorage.setItem(`editjobDescription-${job.id}`, jobDescription)
  }

  return (
    <>
      <Header as="h1">Edit Job</Header>

      {error !== '' && (
        <ErrorWrapper header="Unable to update job" error={error} />
      )}

      <Form onSubmit={handleEditJob}>
        <Form.Group>
          <Form.Input
            id="title"
            label="Title"
            placeholder=""
            defaultValue={
              localStorage.getItem(`editjobTitle-${job.id}`) ?? fields.title
            }
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
            defaultValue={
              localStorage.getItem(`editjobBudget-${job.id}`) ?? fields.budget
            }
            onChange={(event) => {
              handleInputChange(event)
              setLocalJobBudget(event.target.value)
            }}
            required
            width={4}
          />
        </Form.Group>

        <Form.Input
          control={TextArea}
          id="description"
          label="Description"
          placeholder=""
          rows={12}
          defaultValue={
            localStorage.getItem(`editjobDescription-${job.id}`) ??
            fields.description
          }
          onChange={(event) => {
            handleInputChange(event)
            setLocalJobDescription(event.target.value)
          }}
          required
        />

        <MarkdownIsSupported />

        <Button content="Update" primary disabled={!formFilled} />
      </Form>
    </>
  )
}
