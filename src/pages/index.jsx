import React from 'react'
import { Segment, Button, Divider, Container, Header } from 'semantic-ui-react'
import Layout from '../components/Layout'

const Home = () => {
  return (
    <>
      <Segment basic padded>
        <Segment basic padded="very" textAlign="center">
          <Header as="h1">Join Our Free Beta Testing</Header>
        </Segment>

        <Container text fluid>
          <Header as="h2">What’s going on?</Header>

          <Divider hidden />

          <p>
            We are OptriSpace — a service for people looking for jobs and for
            others looking for professionals for their projects. Our platform is
            based on the blockchain technology and uses our own cryptocurrency
            as a payment method. That makes OptriSpace secure and fast.
            We&apos;re almost ready to launch the beta testing and we need
            people to send us feedback to improve our product.
          </p>

          <Divider hidden />

          <Header as="h2">When does the beta start?</Header>

          <Divider hidden />

          <p>
            We don’t know yet, within a few weeks approx. Leave us your email
            and we’ll let you know when everything’s ready.
          </p>

          <Divider hidden />

          <Header as="h2">What can you do here?</Header>

          <Divider hidden />

          <p>
            Basically, whatever you want. All the product functionality is
            available for beta testers.
          </p>

          <Divider hidden />

          <Header as="h2">What do we expect?</Header>

          <Divider hidden />

          <p>
            We expect you to share your user experience. To do so please send us
            an email at team@optriment.com or use &quot;Send Feedback&quot;
            button in the app.
          </p>

          <Divider hidden />

          <Header as="h2">Is it free?</Header>

          <Divider hidden />

          <p>
            Yes, OptriSpace is absolutely free of charge during beta testing. In
            the future we are planning to introduce Premium features.
          </p>
        </Container>

        <Segment basic padded="very" textAlign="center">
          <Button as="a" href="/sign_up" size="huge" positive>
            Get Early Access!
          </Button>
        </Segment>
      </Segment>
    </>
  )
}

Home.getLayout = (page) => {
  return (
    <Layout
      meta={{
        title: 'OptriSpace - Find a Job! Find a Pro!',
      }}
    >
      {page}
    </Layout>
  )
}

export default Home
