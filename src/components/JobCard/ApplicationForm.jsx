import React, { useState } from 'react'

import useSWR from 'swr'
import { fetchWithToken } from '../../lib/fetcher'
import getConfig from 'next/config'
import {
  Button,
  Input,
  Form,
  Message,
  Header,
  TextArea,
} from 'semantic-ui-react'
import { useRouter } from 'next/router'
import JustOneSecond from '../JustOneSecond'
import { useAuth } from '../../hooks'
import { createApplication } from '../../lib/api'

const useApplications = () => {
  const { publicRuntimeConfig } = getConfig()
  const { token } = useAuth()
  const { query } = useRouter()

  const { data, error } = useSWR(
    () =>
      token &&
      query.id && [
        `${publicRuntimeConfig.api_url}/jobs/${query.id}/applications`,
        token,
      ],
    fetchWithToken
  )

  if (error) return { error }
  if (!data) return { isLoading: true }

  return { applications: data }
}

const ApplicationForm = ({ job }) => {
  const { token } = useAuth()
  const router = useRouter()

  const {
    applications,
    isLoading,
    error: applicationLoadingError,
  } = useApplications()

  const initialFields = {
    comment: '',
    price: '',
  }

  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState(undefined)

  const handleCreateApplication = (e) => {
    e.preventDefault()

    createApplication(token, job.id, { ...fields })
      .then((application) => {
        if (!application.id) {
          setErrors(application.message)

          return
        }

        router.reload()
      })
      .catch((err) => {
        throw err
      })
  }

  const handleInputChange = (e) => {
    setFields({ ...fields, ...{ [e.target.id]: e.target.value } })
  }

  const application =
    applications && applications.length === 1 && applications[0]

  return (
    <>
      {applicationLoadingError && (
        <Message error header="Не удалось загрузить заявки ко проекту" />
      )}

      {isLoading && <JustOneSecond />}

      {application ? (
        <Message>
          <Message.Header>
            Ваша заявка на сумму {application.price} принята
          </Message.Header>
          <p>{application.comment}</p>
        </Message>
      ) : (
        <>
          <Header as="h3">Оставить заявку ко проекту</Header>

          {errors && (
            <Message
              error
              header="Errors occured"
              list={Array.isArray(errors) ? errors : [errors]}
            />
          )}
          <Form reply onSubmit={handleCreateApplication}>
            <Form.Field
              id="comment"
              control={TextArea}
              label="Опишите ваш опыт и почему надо выбрать именно вас"
              rows={5}
              value={fields.comment}
              onChange={handleInputChange}
              required
            />

            <Form.Field
              id="price"
              control={Input}
              label="Укажите стоимость ваших услуг в рамках этого проекта"
              value={fields.price}
              onChange={handleInputChange}
              required
            />

            <Button
              content="Оставить заявку"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </>
      )}
    </>
  )
}

export default ApplicationForm
