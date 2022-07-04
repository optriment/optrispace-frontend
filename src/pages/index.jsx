import React from 'react'
import { Header } from 'semantic-ui-react'
import Layout from '../components/Layout'

const Home = () => {
  return <Header as="h1">Welcome to OptriSpace</Header>
}

Home.getLayout = (page) => {
  return (
    <Layout
      meta={{
        title: 'Home | OptriSpace',
      }}
    >
      {page}
    </Layout>
  )
}

export default Home
