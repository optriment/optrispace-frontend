import React from 'react'
import { Input, Segment, Grid, Header } from 'semantic-ui-react'
import { ChangePasswordForm } from '../../../forms/ChangePassword'
import { ConnectWalletForm } from '../../../forms/ConnectWalletForm'

export const SettingsScreen = ({ person, token, authenticate }) => {
  return (
    <>
      <Header as="h1">Settings</Header>

      <Grid padded stackable>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3">Connect Wallet</Header>

            <ConnectWalletForm token={token} person={person} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3">Change Password</Header>

            <ChangePasswordForm token={token} authenticate={authenticate} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3">Your ID (for bug reports)</Header>

            <Segment>
              <Input value={person.id} readOnly fluid />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
