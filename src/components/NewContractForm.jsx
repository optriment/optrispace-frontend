import React, { useState } from 'react'
import Router from 'next/router'

import {
  Button,
  Form,
  Grid,
  Divider,
  TextArea,
  Message,
} from 'semantic-ui-react'

import { createContract } from '../lib/api'

export default function NewContractForm({ job, person, application }) {
  const initialFields = {
    title: job.title,
    description: job.description,
    price: '',
    duration: '',
  }
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState(undefined)

  const handleCreateContract = (e) => {
    e.preventDefault()

    createContract(
      person.id, // Token
      {
        application_id: application.id,
        performer_id: application.applicant.id,
        ...fields,
      }
    )
      .then((contract) => {
        if (!contract.id) {
          setErrors(contract.message)

          return
        }

        Router.push(`/contracts/${contract.id}`)
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

      <Form onSubmit={handleCreateContract}>
        <Grid container stackable verticalAlign="top">
          <Grid.Row>
            <Grid.Column width={8}>
              <h1>Создание нового контракта</h1>
            </Grid.Column>

            <Grid.Column width={8} textAlign="right">
              <Button primary type="submit">
                Отправить исполнителю
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
                id="price"
                label="Стоимость работы"
                placeholder=""
                value={fields.price}
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

              <h2>Исполнитель</h2>

              <Form.Input
                label="ID"
                placeholder=""
                value={application.applicant.id}
                readonly
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </>
  )
}
