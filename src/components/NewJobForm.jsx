import React, { useState } from 'react'
import Router from 'next/router'

import { Button, Form, TextArea, Message } from 'semantic-ui-react'

import { createJob } from '../lib/api'

export default function NewJobForm({ token }) {
  const initialFields = {
    title: '',
    description: '',
    budget: '',
  }
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState(undefined)

  const handleCreateJob = (e) => {
    e.preventDefault()

    createJob(token, { ...fields })
      .then((job) => {
        if (!job.id) {
          setErrors(job.message)

          return
        }

        Router.push(`/jobs/${job.id}`)
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

      <Form onSubmit={handleCreateJob}>
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
          Submit
        </Button>
      </Form>
    </>
  )
}
