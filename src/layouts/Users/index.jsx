import React, { useContext } from 'react'
import Head from 'next/head'
import { Divider, Grid, Button, Segment } from 'semantic-ui-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Web3Debug } from '../../components/Web3Debug'
import DisplayContext from '../../context/display-context'
import { Favicon } from '../../components/Favicon'

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

        <Favicon />
      </Head>

      <Grid container columns={1}>
        <Grid.Column>
          <Header />

          <Divider />
        </Grid.Column>

        <Grid.Column>{children}</Grid.Column>

        <Grid.Column>
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
        </Grid.Column>
      </Grid>
    </>
  )
}
