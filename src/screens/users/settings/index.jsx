import React from 'react'
import { Segment, Grid, Header } from 'semantic-ui-react'
import JustOneSecond from '../../../components/JustOneSecond'
import { ChangePasswordForm } from '../../../forms/ChangePassword'
import { useAuth } from '../../../hooks'

export const SettingsScreen = () => {
  const { isLoading: personLoading, token, authenticate } = useAuth()

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  return (
    <>
      <Header as="h1">Settings</Header>

      <Grid padded stackable>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3">Change Password</Header>

            <Segment>
              <ChangePasswordForm token={token} authenticate={authenticate} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
