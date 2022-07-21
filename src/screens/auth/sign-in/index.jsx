import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { SignInForm } from '../../../forms/SignIn'

export const SignInScreen = () => (
  <Grid textAlign="center" style={{ marginTop: '1em' }}>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" textAlign="center">
        Sign In
      </Header>

      <SignInForm />
    </Grid.Column>
  </Grid>
)
