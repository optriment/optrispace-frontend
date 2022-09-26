import React from 'react'
import Link from 'next/link'
import { Container, Divider, Button, Header, List } from 'semantic-ui-react'

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

      <Divider style={{ marginTop: isSmallScreen ? '2em' : '5em' }} />

      <Container text textAlign="justified">
        <Header
          as="h2"
          content="What is going on?"
          style={{
            fontSize: isSmallScreen ? '1.5em' : '1.8em',
            fontWeight: 'normal',
            marginTop: isSmallScreen ? '1.0em' : '1.3em',
          }}
        />

        <p>
          We are OptriSpace - an international team who got together to face a
          challenge and build a brand-new platform for people like us:
          freelancers, managers and entrepreneurs. We provide a platform for
          people looking for jobs or for professionals for their projects.
        </p>

        <p>
          Our platform is based on the blockchain technology and uses
          cryptocurrency as a payment method. That makes OptriSpace secure and
          fast.
        </p>

        <Header
          as="h2"
          content="What is inside?"
          style={{
            fontSize: isSmallScreen ? '1.5em' : '1.8em',
            fontWeight: 'normal',
            marginTop: isSmallScreen ? '1.0em' : '1.3em',
          }}
        />

        <List bulleted>
          <List.Item>
            Powered by{' '}
            <Link
              href="https://github.com/optriment/optrispace-contract"
              passHref
            >
              <a
                href="https://github.com/optriment/optrispace-contract"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Smart Contracts
              </a>
            </Link>
          </List.Item>
          <List.Item>
            All of our code is{' '}
            <Link href="https://github.com/optriment" passHref>
              <a
                href="https://github.com/optriment"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                open source
              </a>
            </Link>
          </List.Item>
          <List.Item>All payments in crypto</List.Item>
          <List.Item>Remote first</List.Item>
          <List.Item>No paperwork</List.Item>
          <List.Item>No middlemen</List.Item>
        </List>

        <Header
          as="h2"
          content="What network do we use?"
          style={{
            fontSize: isSmallScreen ? '1.5em' : '1.8em',
            fontWeight: 'normal',
            marginTop: isSmallScreen ? '1.0em' : '1.3em',
          }}
        />

        <p>
          Binance Smart Chain.
          <br />
          Our main currency is the native currency of this network (BNB).
        </p>
      </Container>
    </>
  )
}
