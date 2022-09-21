import Link from 'next/link'
import { Message, Icon } from 'semantic-ui-react'

export const ProfileIsNotConfigured = () => {
  return (
    <Message icon>
      <Icon name="warning" />

      <Message.Content>
        <Message.Header>Your profile is not configured</Message.Header>
        Please provide additional information.{' '}
        <Link href="/settings" passHref>
          <a>Open Settings</a>
        </Link>
      </Message.Content>
    </Message>
  )
}
