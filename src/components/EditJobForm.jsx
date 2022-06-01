import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Message, TextArea } from 'semantic-ui-react'
import { updateJob } from '../lib/api'

export default function EditJobForm({ job, token }) {
  const router = useRouter()

  const initialFields = {
    title: job.title,
    description: job.description,
    budget: job.budget,
  }
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState(undefined)

  const handleEditJob = (e) => {
    e.preventDefault()

    updateJob(token, job.id, { ...fields })
      .then((job) => {
        if (!job.id) {
          setErrors(job.message)

          return
        }

        router.push(`/jobs/${job.id}`)
      })
      .catch((err) => {
        throw err
      })
  }

  const handleInputChange = (e) => {
    setFields({ ...fields, ...{ [e.target.id]: e.target.value } })
  }

  return (
    <>
      {errors && (
        <Message
          error
          header="Errors occured"
          list={Array.isArray(errors) ? errors : [errors]}
        />
      )}

      <Form onSubmit={handleEditJob}>
        <Form.Input
          id="title"
          label="Job Title"
          placeholder=""
          value={fields.title}
          onChange={handleInputChange}
          required
        />

        <Form.Input
          control={TextArea}
          id="description"
          label="Job Description"
          placeholder=""
          rows={10}
          value={fields.description}
          onChange={handleInputChange}
          required
        />

        <Form.Input
          id="budget"
          label="Approx. budget"
          placeholder=""
          value={fields.budget}
          onChange={handleInputChange}
          required
          width={3}
        />

        <Button primary type="submit">
          Save
        </Button>
      </Form>
    </>
  )
}
