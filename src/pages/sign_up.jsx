import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import Layout from '../components/Layout'
import SignUpForm from '../components/SignUpForm'

export default function SignUp() {
  return (
    <Layout renderMenu={false}>
      <Grid textAlign="center" style={{ height: '100vh', marginTop: '1em' }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            Sign Up
          </Header>

          <SignUpForm />
        </Grid.Column>
      </Grid>
    </Layout>
  )
}
