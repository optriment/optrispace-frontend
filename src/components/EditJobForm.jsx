import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Grid,
  Segment,
  Header,
  Divider,
  Button,
  Form,
  TextArea,
} from 'semantic-ui-react'
import { updateJob } from '../lib/api'
import ErrorWrapper from './ErrorWrapper'
import { isEmptyString } from '../lib/validators'

export default function EditJobForm({ job, token }) {
  const router = useRouter()

  const initialFields = {
    title: job.title,
    description: job.description,
    budget: job.budget,
  }
  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState(undefined)
  const [formFilled, setFormFilled] = useState(false)

  const handleEditJob = () => {
    setError(null)

    try {
      updateJob(token, job.id, { ...fields })
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
          <Grid.Column width={13}>
            <Header as="h1">Edit Job</Header>
          </Grid.Column>

          <Grid.Column width={3} textAlign="right">
            <Button
              content="Save"
              labelPosition="left"
              icon="check"
              primary
              onClick={handleEditJob}
              disabled={!formFilled}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider hidden />

      {error && <ErrorWrapper header="Unable to update job" error={error} />}

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
