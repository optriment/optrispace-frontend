import React from 'react'

import { Header } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import NewJobForm from '../../components/NewJobForm'
import { useAuth } from '../../hooks'

const NewJobPage = () => {
  const { token } = useAuth()

  return (
    <>
      <Header as="h1">Add New Job</Header>

      <NewJobForm token={token} />
    </>
  )
}

NewJobPage.requiresAuth = true
NewJobPage.redirectUnauthenticatedTo = '/sign_in'

NewJobPage.getLayout = (page) => (
  <Layout
    meta={{
      title: 'New Job | Optrispace',
      description: 'Welcome to Optrispace',
    }}
  >
    {page}
  </Layout>
)

export default NewJobPage
