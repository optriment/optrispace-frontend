import React from 'react'
import Head from 'next/head'
import { Container, Grid, Segment } from 'semantic-ui-react'
import Header from '../Header'
import Footer from '../Footer'

import 'semantic-ui-css/semantic.min.css'

const Layout = ({ children, meta = {} }) => {
  const { title, description } = meta

  return (
    <>
      <Head>
        <title>{title || 'OptriSpace'}</title>
        <meta
          name="description"
          content={
            description ||
            'OptriSpace brings together digital and IT experts, founders, freelancers, stakeholders and enthusiasts ' +
              'and provides a decentralized platform for collaboration and services exchange'
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png"></link>
      </Head>

      <Container>
        <Header />

        <Segment basic padded>
          <Grid stackable verticalAlign="top">
            <Grid.Column>{children}</Grid.Column>
          </Grid>
        </Segment>

        <Footer />
      </Container>
    </>
  )
}

export default Layout
