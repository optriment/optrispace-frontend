import React from 'react'
import Head from 'next/head'
import { Message, Icon, Container, Segment } from 'semantic-ui-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import getConfig from 'next/config'
import Link from 'next/link'
import { Favicon } from '../../components/Favicon'

import 'semantic-ui-css/semantic.min.css'
import SEOTags from '../../components/SEOTags'

const { publicRuntimeConfig } = getConfig()

export const LandingLayout = ({ children, meta = {} }) => {
  const { title, description } = meta

  const productDomain = 'optrispace.com'
  const productTitle = 'OptriSpace'
  const pageTitle = title ? `${title} | ${productTitle}` : productTitle
  const defaultDescription =
    'OptriSpace brings together digital and IT experts, founders, freelancers, stakeholders and enthusiasts ' +
    'and provides a decentralized platform for collaboration and services exchange'

  const pageDescription = description
    ? description + ' - ' + defaultDescription
    : defaultDescription

  const { domain } = publicRuntimeConfig

  return (
    <>
      <Head>
        <Favicon />
      </Head>

      <Container>
        <SEOTags
          pageTitle={pageTitle}
          pageDescription={pageDescription}
          pageUrl={productDomain}
        />
        <Header />

        {!domain.match(/my\.optrispace\.com/) && (
          <Message negative icon>
            <Icon name="rocket" />

            <Message.Content>
              <Message.Header>
                This is the development version of the platform
              </Message.Header>
              <p>
                Please use production version instead:{' '}
                <Link href="https://my.optrispace.com/" passHref>
                  <a
                    href="https://my.optrispace.com"
                    target="_self"
                    rel="noreferrer nofollow noopener"
                  >
                    https://my.optrispace.com/
                  </a>
                </Link>
              </p>
            </Message.Content>
          </Message>
        )}

        <Segment basic>{children}</Segment>

        <Footer />
      </Container>
    </>
  )
}
