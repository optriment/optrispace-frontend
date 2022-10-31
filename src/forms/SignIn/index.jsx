import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useAuth } from '../../hooks'
import ErrorWrapper from '../../components/ErrorWrapper'
import { errorHandler } from '../../lib/errorHandler'

const getNextURLToRedirect = ({ query }) => {
  const isNextURLValid =
    query.next && query.next.startsWith('/') && !query.next.startsWith('//')

  return isNextURLValid ? query.next : '/'
}

export const SignInForm = () => {
  const router = useRouter()
  const { signIn, authenticate } = useAuth()

  const initialFields = {
    login: '',
    password: '',
  }
  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')

  const handleSignIn = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await signIn(fields.login, fields.password)

      await authenticate(res.token)

      router.push(getNextURLToRedirect(router))
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
        <ErrorWrapper header="Unable to sign in" error={error} />
      )}

      <Segment>
        <Form onSubmit={handleSignIn}>
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

          <Button primary fluid>
            Log In
          </Button>
        </Form>
      </Segment>
    </>
  )
}
