import React from 'react'
import { Segment } from 'semantic-ui-react'

import Layout from '../../components/Layout'
import NewJobForm from '../../components/NewJobForm'
import { useAuth } from '../../hooks'

const Page = () => {
  const { token } = useAuth()

  return (
    <Layout>
      <Segment vertical>
        <NewJobForm token={token} />
      </Segment>
    </Layout>
  )
}

Page.requiresAuth = true
Page.redirectUnauthenticatedTo = '/sign_in'

export default Page
