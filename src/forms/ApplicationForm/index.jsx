import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Grid, Button, Form } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { createApplication } from '../../lib/api'
import { errorHandler } from '../../lib/errorHandler'
import { isEmptyString } from '../../lib/validators'

export const ApplicationForm = ({ job, token, coinSymbol }) => {
  const router = useRouter()

  const initialFields = {
    comment: '',
    price: '',
  }

  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')

  const handleCreateApplication = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await createApplication(token, job.id, { ...fields })

      router.reload()
    } catch (err) {
      console.error({ err })

      setError(errorHandler(err))
    }
  }

  const handleInputChange = (e) => {
    setFields({ ...fields, ...{ [e.target.id]: e.target.value } })
  }

  const formFilled =
    !isEmptyString(fields.comment) && !isEmptyString(fields.price)

  return (
    <>
      {error !== '' && (
        <ErrorWrapper header="Unable to post an application" error={error} />
      )}

      <Form onSubmit={handleCreateApplication}>
        <Grid stackable columns={1}>
          <Grid.Column>
            <Form.TextArea
              id="comment"
              label="Message"
              rows={5}
              required
              value={fields.comment}
              onChange={handleInputChange}
            />
          </Grid.Column>

          <Grid.Column mobile={16} tablet={8} computer={8}>
            <Form.Input
              id="price"
              label={`Your expected service price (${coinSymbol})`}
              type="number"
              min={0.001}
              step={0.001}
              value={fields.price}
              required
              onChange={handleInputChange}
              autoComplete="off"
            />
          </Grid.Column>

          <Grid.Column>
            <Button content="Publish" primary disabled={!formFilled} />
          </Grid.Column>
        </Grid>
      </Form>
    </>
  )
}
