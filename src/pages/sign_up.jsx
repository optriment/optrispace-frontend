import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import Layout from '../components/Layout'
import SignUpForm from '../components/SignUpForm'

const SignUpPage = () => (
  <Grid textAlign="center" style={{ marginTop: '1em' }}>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" textAlign="center">
        Sign Up
      </Header>

      <SignUpForm />
    </Grid.Column>
  </Grid>
)

SignUpPage.getLayout = (page) => (
  <Layout
    meta={{
      title: 'Sign Up | Optrispace',
      description: 'Welcome to Optrispace',
    }}
  >
    {page}
  </Layout>
)

export default SignUpPage
