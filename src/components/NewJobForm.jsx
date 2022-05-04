import React, { useState } from 'react'
import Router from 'next/router'

import { Button, Form, Grid, TextArea, Message } from 'semantic-ui-react'

import { createJob } from '../lib/api'

export default function NewJobForm({ token }) {
  const initialFields = {
    title: '',
    description: '',
    budget: '',
    duration: '',
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
        <Grid container stackable verticalAlign="top">
          <Grid.Row>
            <Grid.Column width={9}>
              <Form.Input
                id="title"
                label="Введите название работы"
                placeholder=""
                value={fields.title}
                onChange={handleInputChange}
                required
              />

              <Form.Input
                control={TextArea}
                id="description"
                label="Подробное описание задачи"
                placeholder=""
                rows={10}
                value={fields.description}
                onChange={handleInputChange}
                required
              />
            </Grid.Column>

            <Grid.Column width={7}>
              <Form.Input
                id="budget"
                label="Примерный бюджет"
                placeholder=""
                value={fields.budget}
                onChange={handleInputChange}
                required
              />

              <Form.Input
                id="duration"
                label="Длительность проекта (в днях)"
                placeholder=""
                value={fields.duration}
                onChange={handleInputChange}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Button primary type="submit">
                Опубликовать
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </>
  )
}
