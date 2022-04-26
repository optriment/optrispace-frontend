import React, { useState } from 'react'
import { Button, Form, Grid, Divider, TextArea } from 'semantic-ui-react'

export default function EditJobForm({ job }) {
  const initialFields = {
    title: job.title,
    description: job.description,
    budget: job.budget,
    duration: job.duration,
  }
  const [fields, setFields] = useState(initialFields)

  const handleEditJob = (e) => {
    e.preventDefault()
  }

  const handleInputChange = (e) => {
    setFields({ ...fields, ...{ [e.target.id]: e.target.value } })
  }

  return (
    <Form onSubmit={handleEditJob}>
      <Grid container stackable verticalAlign="top">
        <Grid.Row>
          <Grid.Column width={8}>
            <h1>Редактирование работы</h1>
          </Grid.Column>

          <Grid.Column width={8} textAlign="right">
            <Button primary type="submit" disabled>
              Сохранить
            </Button>
          </Grid.Column>
        </Grid.Row>

        <Divider />

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
              label="Примерный бюджет (COIN)"
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
      </Grid>
    </Form>
  )
}
