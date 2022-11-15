import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { SignInForm } from '../../../forms/SignIn'

export const SignInScreen = () => (
  <Grid columns={1} textAlign="center">
    <Grid.Column>
      <Header as="h2" content="Sign In" />
    </Grid.Column>

    <Grid.Column mobile={16} tablet={8} computer={6}>
      <SignInForm />
    </Grid.Column>
  </Grid>
)
