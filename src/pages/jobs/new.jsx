import React from 'react'

import Layout from '../../components/Layout'
import NewJobForm from '../../components/NewJobForm'
import { useAuth } from '../../hooks'

const NewJobPage = () => {
  const { token } = useAuth()

  return <NewJobForm token={token} />
}

NewJobPage.requiresAuth = true

NewJobPage.getLayout = (page) => (
  <Layout
    meta={{
      title: 'New Job | OptriSpace',
    }}
  >
    {page}
  </Layout>
)

export default NewJobPage
