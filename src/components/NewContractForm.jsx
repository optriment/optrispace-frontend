import React, { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'

import {
  Button,
  Form,
  Icon,
  Checkbox,
  Grid,
  TextArea,
  Message,
} from 'semantic-ui-react'

import { createContract } from '../lib/api'

export default function NewContractForm({ job, token, application }) {
  const initialFields = {
    title: job.title,
    description: job.description,
    price: application.price,
    duration: application.duration,
  }
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState(undefined)
  const [hideNotice, setHideNotice] = useState(false)

  const handleCreateContract = (e) => {
    e.preventDefault()

    createContract(token, {
      applicationId: application.id,
      performerId: application.applicant.id,
      ...fields,
    })
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

      {!hideNotice && (
        <Message warning onDismiss={() => setHideNotice(true)}>
          <Icon name="info" />
          Часть полей этой формы автоматически заполнена из{' '}
          <Link href="/jobs/[id]" as={`/jobs/${job.id}`} passHref>
            <a>предложения о работе</a>
          </Link>
          {' и'} отклике кандидата
        </Message>
      )}

      <Form onSubmit={handleCreateContract}>
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
                readOnly
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Form.Field
                control={Checkbox}
                label={{
                  children: (
                    <div>
                      Я согласен с{' '}
                      <Link href="#">
                        <a>Правилами</a>
                      </Link>
                      {' и '}
                      <Link href="#" passHref>
                        <a>Условиями</a>
                      </Link>
                    </div>
                  ),
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Button primary type="submit">
                Отправить исполнителю
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </>
  )
}
