import React from 'react'
import Link from 'next/link'
import { Container, Button, List, Divider, Header } from 'semantic-ui-react'

export const ThankYouCustomerScreen = () => {
  return (
    <>
      <Container text textAlign="center">
        <Header as="h1">
          One last thing before we start...
          <br />
          Please check your inbox!
        </Header>
      </Container>

      <Divider hidden />
      <Divider />
      <Divider hidden />

      <Container text>
        <List ordered>
          <List.Item>
            Look for our email from &quot;OptriSpace Team&quot;
            (office@optriment.com) that we just sent to you.
          </List.Item>
          <List.Item>Add us to your safety-senders list.</List.Item>
          <List.Item>
            Click &quot;Yes, subscribe me to this list&quot; in the email.
          </List.Item>
          <List.Item>
            If you don&apos;t receive our confirmation email in the next 2
            hours, please contact us.
          </List.Item>
        </List>
      </Container>

      <Divider hidden />

      <Container textAlign="center">
        <Link href="/sign_up" passHref>
          <Button primary>Click to Continue…</Button>
        </Link>
      </Container>
    </>
  )
}
