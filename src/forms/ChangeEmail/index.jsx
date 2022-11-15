import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { errorHandler } from '../../lib/errorHandler'
import { updateEmail } from '../../lib/settings'
import { isEmptyString } from '../../lib/validators'

export const ChangeEmail = ({ token, id, email }) => {
  const router = useRouter()

  const initialFields = {
    email: email,
  }

  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')

  const handleChangeEmail = async (e) => {
    e.preventDefault()
    setError('')

    if (isEmptyString(fields.email)) {
      setError('You can not set empty email')
      return
    }

    try {
      await updateEmail(token, id, fields.email)

      router.reload()
    } catch (err) {
      console.error({ err })

      setError(errorHandler(err))
    }
  }

  const handleInputChange = (e) => {
    setFields({
      ...fields,
      ...{ [e.target.id]: e.target.value },
    })
  }

  return (
    <Form onSubmit={handleChangeEmail}>
      {error !== '' && (
        <ErrorWrapper header="Unable to change Email" error={error} />
      )}

      <Form.Input
        id="email"
        fluid
        icon="envelope"
        iconPosition="left"
        placeholder="Email"
        value={fields.email}
        autoComplete="email"
        onChange={handleInputChange}
        required
        type="email"
        pattern="[^ @]*@[^ @]*"
        maxLength={64}
      />

      <Button primary fluid>
        Save
      </Button>
    </Form>
  )
}
