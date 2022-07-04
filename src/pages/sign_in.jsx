import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'

const SignInPage = () => (
  <Grid textAlign="center" style={{ marginTop: '1em' }}>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" textAlign="center">
        Log In
      </Header>

      <LoginForm />
    </Grid.Column>
  </Grid>
)

SignInPage.getLayout = (page) => (
  <Layout
    meta={{
      title: 'Sign In | OptriSpace',
    }}
  >
    {page}
  </Layout>
)

export default SignInPage
