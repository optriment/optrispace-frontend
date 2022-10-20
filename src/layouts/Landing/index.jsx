import React from 'react'
import Head from 'next/head'
import { Message, Icon, Container, Segment } from 'semantic-ui-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import getConfig from 'next/config'
import Link from 'next/link'

import 'semantic-ui-css/semantic.min.css'

const { publicRuntimeConfig } = getConfig()

export const LandingLayout = ({ children, meta = {} }) => {
  const { title, description } = meta

  const productDomain = 'optrispace.com'
  const productTitle = 'OptriSpace'
  const pageTitle = title ? `${title} | ${productTitle}` : productTitle

  const defaultDescription =
    'OptriSpace brings together digital and IT experts, founders, freelancers, stakeholders and enthusiasts ' +
    'and provides a decentralized platform for collaboration and services exchange'

  const { domain } = publicRuntimeConfig

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
