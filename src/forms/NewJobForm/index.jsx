import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Divider,
  Grid,
  Header,
  Button,
  Form,
  Segment,
  TextArea,
} from 'semantic-ui-react'
import { createJob } from '../../lib/api'
import { isEmptyString } from '../../lib/validators'
import ErrorWrapper from '../../components/ErrorWrapper'

export const NewJobForm = ({ token }) => {
  const router = useRouter()

  const initialFields = {
    title: '',
    description: '',
    budget: '',
  }
  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')
  const [formFilled, setFormFilled] = useState(false)

  const handleCreateJob = (e) => {
    e.preventDefault()
    setError('')

    try {
      createJob(token, { ...fields })
        .then((result) => {
          if (!result.id) {
            setError(result.message)

            return
          }

          router.push(`/jobs/${result.id}`)
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
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={12}>
            <Header as="h1">Add New Job</Header>
          </Grid.Column>

          <Grid.Column width={4} textAlign="right">
            <Button
              content="Publish"
              labelPosition="left"
              icon="check"
              primary
              onClick={handleCreateJob}
              disabled={!formFilled}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider hidden />

      {error !== '' && (
        <ErrorWrapper header="Unable to create job" error={error} />
      )}

      <Segment secondary padded>
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
            label="Approx. budget (ALZ)"
            placeholder=""
            value={fields.budget}
            onChange={handleInputChange}
            required
            width={3}
          />
        </Form>
      </Segment>
    </>
  )
}
