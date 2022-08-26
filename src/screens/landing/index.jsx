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

      <Divider style={{ marginTop: isSmallScreen ? '2em' : '5em' }} />

      <Container text>
        <Header
          as="h2"
          content="What's going on?"
          style={{
            fontSize: isSmallScreen ? '1.5em' : '1.8em',
            fontWeight: 'normal',
            marginTop: isSmallScreen ? '1.0em' : '1.3em',
          }}
        />

        <p>
          We are OptriSpace — a platform for freelancers looking for jobs and
          for customers looking for professionals for their projects. Besides
          that all our users will become shareholders of our company.
        </p>

        <p>
          Our platform is based on the blockchain technology and uses
          cryptocurrency as a payment method. That makes OptriSpace secure and
          fast. We&apos;re almost ready to launch the beta testing and we need
          you to share your user experience to improve our product.
        </p>

        <Header
          as="h2"
          content="Discover how to earn more"
          style={{
            fontSize: isSmallScreen ? '1.5em' : '1.8em',
            fontWeight: 'normal',
            marginTop: isSmallScreen ? '1.0em' : '1.3em',
          }}
        />

        <p>
          We are looking for hardworking and independent talents who seek global
          contracts with less paperwork and more freedom. We offer a smart
          contracting platform to connect with customers and experts.
        </p>

        <Header
          as="h2"
          content="Who can find job on the platform right now?"
          style={{
            fontSize: isSmallScreen ? '1.5em' : '1.8em',
            fontWeight: 'normal',
            marginTop: isSmallScreen ? '1.0em' : '1.3em',
          }}
        />

        <p>
          Software Developers, QA Engineers, Designers, Copywriters,
          Translators.
        </p>

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
          During the alpha test we are using Binance Smart Chain (Testnet).
          <br />
          Our main currency is native currency of this network (Test BNB).
        </p>

        <Header
          as="h2"
          content="What about payments?"
          style={{
            fontSize: isSmallScreen ? '1.5em' : '1.8em',
            fontWeight: 'normal',
            marginTop: isSmallScreen ? '1.0em' : '1.3em',
          }}
        />

        <p>
          All payments will be in crypto.
          <br />
          Additional information you will receive after the registration.
        </p>
      </Container>
    </>
  )
}
