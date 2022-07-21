import React from 'react'
import Head from 'next/head'
import { Container, Segment } from 'semantic-ui-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import 'semantic-ui-css/semantic.min.css'

export const UsersLayout = ({ children, meta = {} }) => {
  const { title } = meta

  const productTitle = 'OptriSpace'
  const pageTitle = title ? `${title} | ${productTitle}` : productTitle

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png"></link>
      </Head>

      <Container>
        <Header />

        <Segment basic>{children}</Segment>

        <Footer />
      </Container>
    </>
  )
}
