import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Message, Segment } from 'semantic-ui-react'

import { useAuth } from '../hooks'

export default function LoginForm() {
  const { signIn, authenticate } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialFields = {
    login: '',
    password: '',
  }
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState(undefined)

  const handleSignIn = async (e) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)

      const response = await signIn(fields.login, fields.password)
      const json = await response.json()

      if (response.status === 422) {
        setErrors(json.message)
        setIsSubmitting(false)

        return
      }

      if (response.ok) {
        await authenticate(json.token)

        router.push('/jobs')
      }

      setIsSubmitting(false)
    } catch (error) {
      console.error({ error })

      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    setFields({ ...fields, ...{ [e.target.id]: e.target.value } })
  }

  return (
    <>
      {errors && (
        <Message
          error
          header="Unable to sign in"
          list={Array.isArray(errors) ? errors : [errors]}
        />
      )}

      <Form size="large" onSubmit={handleSignIn}>
        <Segment>
          <Form.Input
            id="login"
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Login"
            required
            value={fields.login}
            onChange={handleInputChange}
          />

          <Form.Input
            id="password"
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            required
            value={fields.password}
            onChange={handleInputChange}
          />

          <Button primary fluid size="large" disabled={isSubmitting}>
            Log In
          </Button>
        </Segment>
      </Form>
    </>
  )
}
