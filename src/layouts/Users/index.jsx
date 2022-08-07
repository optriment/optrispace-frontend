import React, { useContext } from 'react'
import Head from 'next/head'
import { Button, Container, Segment } from 'semantic-ui-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Web3Debug } from '../../components/Web3Debug'
import DisplayContext from '../../context/display-context'

import 'semantic-ui-css/semantic.min.css'

export const UsersLayout = ({ children, meta = {} }) => {
  const { isWeb3DebugMode, setIsWeb3DebugMode } = useContext(DisplayContext)
  const { title } = meta

  const productTitle = 'OptriSpace'
  const pageTitle = title ? `${title} | ${productTitle}` : productTitle

  const onToggleWeb3Debug = () => {
    setIsWeb3DebugMode(!isWeb3DebugMode)
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png"></link>
      </Head>

      <Container>
        <Header />

        <Segment basic>
          <Container textAlign="right">
            <Button
              onClick={onToggleWeb3Debug}
              content="Toggle Web3 Debug"
              size="tiny"
              secondary
            />
          </Container>

          {isWeb3DebugMode && (
            <Segment secondary>
              <Web3Debug />
            </Segment>
          )}

          {children}
        </Segment>

        <Footer />
      </Container>
    </>
  )
}
