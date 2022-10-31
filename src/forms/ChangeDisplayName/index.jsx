import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Segment } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { errorHandler } from '../../lib/errorHandler'
import { updateDisplayName } from '../../lib/settings'
import { isEmptyString } from '../../lib/validators'

export const ChangeDisplayName = ({ token, id, displayName }) => {
  const router = useRouter()

  const initialFields = {
    display_name: displayName,
  }

  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')

  const handleChangeDisplayName = async (e) => {
    e.preventDefault()
    setError('')

    if (isEmptyString(fields.display_name)) {
      setError('You can not set empty display name')
      return
    }

    try {
      await updateDisplayName(token, id, fields.display_name)

      router.reload()
    } catch (err) {
      console.error({ err })

      setError(errorHandler(err))
    }
  }

  const handleInputChange = (e) => {
    setFields({ ...fields, ...{ [e.target.id]: e.target.value } })
  }

  return (
    <Segment>
      <Form onSubmit={handleChangeDisplayName}>
        {error !== '' && (
          <ErrorWrapper header="Unable to change Display Name" error={error} />
        )}

        <Form.Input
          id="display_name"
          fluid
          icon="user"
          iconPosition="left"
          placeholder="Display Name"
          value={fields.display_name}
          autoComplete="name"
          onChange={handleInputChange}
          required
          maxLength={64}
        />

        <Button primary fluid>
          Save
        </Button>
      </Form>
    </Segment>
  )
}
