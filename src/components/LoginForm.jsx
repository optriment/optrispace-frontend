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
    setErrors(null)
    setIsSubmitting(true)

    try {
      const response = await signIn(fields.login, fields.password)
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
            autoComplete="username"
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
            autoComplete="current-password"
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
