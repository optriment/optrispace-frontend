import React from 'react'
import Head from 'next/head'
import { Container, Segment } from 'semantic-ui-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import 'semantic-ui-css/semantic.min.css'

export const LandingLayout = ({ children, meta = {} }) => {
  const { title, description } = meta

  const productDomain = 'optrispace.com'
  const productTitle = 'OptriSpace'
  const pageTitle = title ? `${title} | ${productTitle}` : productTitle

  const defaultDescription =
    'OptriSpace brings together digital and IT experts, founders, freelancers, stakeholders and enthusiasts ' +
    'and provides a decentralized platform for collaboration and services exchange'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description || defaultDescription} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://${productDomain}`} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@optrispace" />
        <meta property="twitter:domain" content={productDomain} />
        <meta property="twitter:url" content={`https://${productDomain}`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <link rel="icon" type="image/png" href="/favicon.png"></link>
      </Head>

      <Container>
        <Header />

        <Segment basic>{children}</Segment>

        <Footer />
      </Container>
    </>
  )
}
