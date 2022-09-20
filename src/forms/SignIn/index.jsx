import * as Sentry from '@sentry/nextjs'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useAuth } from '../../hooks'
import ErrorWrapper from '../../components/ErrorWrapper'

const getNextURLToRedirect = ({ query }) => {
  const isNextURLValid =
    query.next && query.next.startsWith('/') && !query.next.startsWith('//')

  return isNextURLValid ? query.next : '/'
}

export const SignInForm = () => {
  const { signIn, authenticate } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialFields = {
    login: '',
    password: '',
  }
  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')

  const handleSignIn = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await signIn(fields.login, fields.password)
      const json = await response.json()

      if (response.ok) {
        await authenticate(json.token)

        router.push(getNextURLToRedirect(router))
      } else {
        // We use this condition below because in backend we don't have descriptive messages right now
        if (json.message.match(/unable to login/i)) {
          setError('Invalid credentials')
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
        <ErrorWrapper header="Unable to sign in" error={error} />
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
