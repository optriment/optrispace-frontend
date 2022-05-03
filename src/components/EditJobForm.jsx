import React, { useState } from 'react'
import { Button, Form, Grid, Message, TextArea } from 'semantic-ui-react'

export default function EditJobForm({ job }) {
  const initialFields = {
    title: job.title,
    description: job.description,
    budget: job.budget,
    duration: job.duration,
  }
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState(undefined)

  const handleEditJob = (e) => {
    e.preventDefault()

    setErrors([])
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
                placeholder="100 COIN"
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
                Сохранить
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </>
  )
}
