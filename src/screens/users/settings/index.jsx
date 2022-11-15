import React from 'react'
import { Segment, Input, Grid, Header } from 'semantic-ui-react'
import { ChangePasswordForm } from '../../../forms/ChangePassword'
import { ChangeDisplayName } from '../../../forms/ChangeDisplayName'
import { ConnectWalletForm } from '../../../forms/ConnectWalletForm'
import { ChangeEmail } from '../../../forms/ChangeEmail'

export const SettingsScreen = ({ person, token, authenticate }) => {
  return (
    <Grid stackable columns={1}>
      <Grid.Column textAlign="center">
        <Header as="h1" content="Settings" />
      </Grid.Column>

      <Grid.Column width={8}>
        <Header as="h3" content="Connect Wallet" />

        <Segment>
          <ConnectWalletForm token={token} person={person} />
        </Segment>
      </Grid.Column>

      <Grid.Column width={8}>
        <Header as="h3" content="Change Display Name" />

        <Segment>
          <ChangeDisplayName
            token={token}
            id={person.id}
            displayName={person.display_name}
          />
        </Segment>
      </Grid.Column>

      <Grid.Column width={8}>
        <Header as="h3" content="Change Email" />

        <Segment>
          <ChangeEmail token={token} id={person.id} email={person.email} />
        </Segment>
      </Grid.Column>

      <Grid.Column width={8}>
        <Header as="h3" content="Change Password" />

        <Segment>
          <ChangePasswordForm token={token} authenticate={authenticate} />
        </Segment>
      </Grid.Column>

      <Grid.Column width={8}>
        <Header as="h3" content="Your ID (for bug reports)" />

        <Segment>
          <Input value={person.id} readOnly fluid />
        </Segment>
      </Grid.Column>
    </Grid>
  )
}
