import React from 'react'
import { useRouter } from 'next/router'
import { Button, Divider, Header, Segment } from 'semantic-ui-react'

const Footer = () => {
  const router = useRouter()

  if (
    router.pathname.startsWith('/sign_in') ||
    router.pathname.startsWith('/sign_up') ||
    router.pathname === '/'
  ) {
    return null
  }

  return (
    <>
      <Segment basic padded>
        <Segment basic textAlign="center">
          <Header as="h2">
            If you have any questions please click the button below
          </Header>

          <Divider hidden />

          <Button
            as="a"
            content="Leave feedback"
            icon="write"
            positive
            href="https://forms.gle/EjLSGHEpY4eafUr89"
            target="_blank"
            rel="noopener noreferrer"
          />
        </Segment>
      </Segment>

      <Divider hidden />
    </>
  )
}

export default Footer
