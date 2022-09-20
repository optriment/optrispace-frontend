import * as Sentry from '@sentry/nextjs'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useAuth } from '../../hooks'
import ErrorWrapper from '../../components/ErrorWrapper'

export const SignUpForm = () => {
  const { signUp, authenticate } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialFields = {
    login: '',
    password: '',
    email: '',
    display_name: '',
  }
  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await signUp(fields)
      const json = await response.json()

      if (response.ok) {
        await authenticate(json.token)

        router.push('/')
      } else {
        // We use this condition below because in backend we don't have descriptive messages right now
        if (json.message.match(/duplication/i)) {
          setError('Login already exists')
        } else {
          setError(json.message)
        }
      }
    } catch (err) {
      console.error({ err })

      if (err.message.match(/failed to fetch/i)) {
        Sentry.captureMessage('Server is not available')
        setError('Server is not available')
      } else {
        Sentry.captureException(err)
        setError(err.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    setFields({ ...fields, ...{ [e.target.id]: e.target.value } })
  }

  return (
    <>
      {error !== '' && (
        <ErrorWrapper header="Unable to sign up" error={error} />
      )}

      <Form size="large" onSubmit={handleSignUp}>
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

          {/*
          <Form.Input
            id="email"
            fluid
            icon="mail"
            iconPosition="left"
            placeholder="Email"
            value={fields.email}
            autoComplete="email"
            onChange={handleInputChange}
          />

          <Form.Input
            id="display_name"
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Display Name"
            value={fields.display_name}
            autoComplete="name"
            onChange={handleInputChange}
          />
          */}

          <Button primary fluid size="large" disabled={isSubmitting}>
            Sign Up
          </Button>
        </Segment>
      </Form>
    </>
  )
}
