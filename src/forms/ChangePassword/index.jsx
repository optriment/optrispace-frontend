import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form } from 'semantic-ui-react'
import ErrorWrapper from '../../components/ErrorWrapper'
import { changeUserPassword } from '../../lib/settings'
import { errorHandler } from '../../lib/errorHandler'

export const ChangePasswordForm = ({ token, authenticate }) => {
  const router = useRouter()

  const initialFields = {
    old_password: '',
    new_password: '',
  }

  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const json = await changeUserPassword(token, {
        old_password: fields.old_password,
        new_password: fields.new_password,
      })

      await authenticate(json.token)

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
    <>
      {error !== '' && (
        <ErrorWrapper header="Unable to change password" error={error} />
      )}

      <Form onSubmit={handleChangePassword}>
        <Form.Input
          id="old_password"
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Current Password"
          type="password"
          required
          autoComplete="current-password"
          value={fields.old_password}
          onChange={handleInputChange}
        />

        <Form.Input
          id="new_password"
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="New Password"
          type="password"
          required
          autoComplete="new-password"
          value={fields.new_password}
          onChange={handleInputChange}
        />

        <Button primary fluid>
          Update Password
        </Button>
      </Form>
    </>
  )
}
