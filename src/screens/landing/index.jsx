import React from 'react'
import Link from 'next/link'
import { Container, Divider, Button, Header } from 'semantic-ui-react'

export const LandingScreen = ({ isSmallScreen }) => {
  return (
    <>
      <Container textAlign="center" fluid>
        <Header
          as="h1"
          style={{
            fontSize: isSmallScreen ? '3.5em' : '5em',
            fontWeight: 'bold',
            marginBottom: 0,
            marginTop: isSmallScreen ? null : '0.7em',
          }}
        >
          OptriSpace
        </Header>

        <Header
          as="h2"
          content="Find a Job. Find a Pro."
          style={{
            fontSize: isSmallScreen ? '1.3em' : '1.8em',
            fontWeight: 'normal',
            marginTop: isSmallScreen ? '0.8em' : '1.3em',
          }}
        />

        <Divider style={{ marginTop: isSmallScreen ? '1em' : '3em' }} hidden />

        <Button.Group size="huge">
          <Link href="/sign_up" passHref>
            <Button primary>Register</Button>
          </Link>

          <Button.Or />

          <Link href="/sign_in" passHref>
            <Button primary>Log In</Button>
          </Link>
        </Button.Group>
      </Container>

      <Divider hidden style={{ marginTop: isSmallScreen ? '2em' : '5em' }} />
    </>
  )
}
