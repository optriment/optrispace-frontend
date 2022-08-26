import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Segment, Header, Button, Form, TextArea } from 'semantic-ui-react'
import { updateJob } from '../../lib/api'
import ErrorWrapper from '../../components/ErrorWrapper'
import { isEmptyString } from '../../lib/validators'

export const EditJobForm = ({ job, token, currencyLabel }) => {
  const router = useRouter()

  const initialFields = {
    title: job.title,
    description: job.description,
    budget: job.budget,
  }
  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')
  const [formFilled, setFormFilled] = useState(false)

  const handleEditJob = () => {
    setError('')

    try {
      updateJob(token, job.id, { ...fields })
        .then((result) => {
          if (!result.id) {
            setError(result.message)
          } else {
            router.push(`/jobs/${result.id}`)
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

  useEffect(() => {
    setFormFilled(
      !isEmptyString(fields.title) &&
        !isEmptyString(fields.description) &&
        !isEmptyString(fields.budget)
    )
  }, [fields])

  return (
    <>
      <Header as="h1">Edit Job</Header>

      {error !== '' && (
        <ErrorWrapper header="Unable to update job" error={error} />
      )}

      <Segment padded>
        <Form>
          <Form.Input
            id="title"
            label="Title"
            placeholder=""
            value={fields.title}
            onChange={handleInputChange}
            required
          />

          <Form.Input
            control={TextArea}
            id="description"
            label="Description"
            placeholder=""
            rows={15}
            value={fields.description}
            onChange={handleInputChange}
            required
          />

          <Form.Input
            id="budget"
            type="number"
            min={0.0}
            step={0.01}
            label={`Approx. budget (${currencyLabel})`}
            placeholder=""
            value={fields.budget}
            onChange={handleInputChange}
            required
            width={3}
          />

          <Button
            content="Save"
            primary
            onClick={handleEditJob}
            disabled={!formFilled}
          />
        </Form>
      </Segment>
    </>
  )
}
