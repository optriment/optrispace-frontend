import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { SignUpForm } from '../../../forms/SignUp'

export const SignUpScreen = () => (
  <Grid textAlign="center" style={{ marginTop: '1em' }}>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" textAlign="center">
        Sign Up
      </Header>

      <SignUpForm />
    </Grid.Column>
  </Grid>
)
