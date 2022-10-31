import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useAuth } from '../../hooks'
import ErrorWrapper from '../../components/ErrorWrapper'
import { errorHandler } from '../../lib/errorHandler'

export const SignUpForm = () => {
  const { signUp, authenticate } = useAuth()
  const router = useRouter()

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

    try {
      const res = await signUp(fields)

      await authenticate(res.token)

      router.push('/')
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
        <ErrorWrapper header="Unable to sign up" error={error} />
      )}

      <Segment>
        <Form onSubmit={handleSignUp}>
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

          <Button primary fluid>
            Sign Up
          </Button>
        </Form>
      </Segment>
    </>
  )
}
