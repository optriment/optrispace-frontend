import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { SignUpForm } from '../../../forms/SignUp'

export const SignUpScreen = () => (
  <Grid columns={1} textAlign="center">
    <Grid.Column>
      <Header as="h2" content="Sign Up" />
    </Grid.Column>

    <Grid.Column mobile={16} tablet={8} computer={6}>
      <SignUpForm />
    </Grid.Column>
  </Grid>
)
