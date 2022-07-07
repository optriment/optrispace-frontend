import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Message, Segment } from 'semantic-ui-react'

import { useAuth } from '../hooks'

export default function SignUpForm() {
  const { signUp, authenticate } = useAuth()
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
    setErrors(null)
    setIsSubmitting(true)

    try {
      const response = await signUp(fields.login, fields.password)
      const json = await response.json()

      if (response.ok) {
        await authenticate(json.token)

        router.push('/jobs')
      } else {
        setErrors(json.message)
      }
    } catch (error) {
      setErrors(error)
    } finally {
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
          header="Unable to sign up"
          list={Array.isArray(errors) ? errors : [errors]}
        />
      )}

      <Form size="large" onSubmit={handleSignIn}>
        <Segment>
          <Form.Input
            id="login"
            fluid
            icon="user"
            required
            iconPosition="left"
            placeholder="Login"
            value={fields.login}
            autoComplete="username"
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
            autoComplete="new-password"
            onChange={handleInputChange}
          />

          <Button primary fluid size="large" disabled={isSubmitting}>
            Sign Up
          </Button>
        </Segment>
      </Form>
    </>
  )
}
