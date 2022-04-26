import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'

export default function SignIn() {
  return (
    <Layout renderMenu={false}>
      <Grid textAlign="center" style={{ height: '100vh', marginTop: '1em' }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            Log In
          </Header>

          <LoginForm />
        </Grid.Column>
      </Grid>
    </Layout>
  )
}
