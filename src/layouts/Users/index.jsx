import React, { useContext } from 'react'
import Head from 'next/head'
import { Icon, Button, Container, Message, Segment } from 'semantic-ui-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Web3Debug } from '../../components/Web3Debug'
import DisplayContext from '../../context/display-context'
import getConfig from 'next/config'
import Link from 'next/link'
import { Favicon } from '../../components/Favicon'

import 'semantic-ui-css/semantic.min.css'

const { publicRuntimeConfig } = getConfig()

export const UsersLayout = ({ children, meta = {} }) => {
  const { isWeb3DebugMode, setIsWeb3DebugMode } = useContext(DisplayContext)
  const { title } = meta

  const productTitle = 'OptriSpace'
  const pageTitle = title ? `${title} | ${productTitle}` : productTitle

  const onToggleWeb3Debug = () => {
    setIsWeb3DebugMode(!isWeb3DebugMode)
  }

  const { domain } = publicRuntimeConfig

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <Favicon />
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

        <Segment basic textAlign="center">
          <Button
            compact
            onClick={onToggleWeb3Debug}
            content="Toggle Web3 Debug"
            size="mini"
          />

          {isWeb3DebugMode && (
            <Segment basic>
              <Web3Debug />
            </Segment>
          )}
        </Segment>
      </Container>
    </>
  )
}
