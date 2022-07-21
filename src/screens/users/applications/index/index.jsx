import React from 'react'
import { Divider, Header } from 'semantic-ui-react'
import ApplicationsList from '../../../../components/ApplicationsList'
import JustOneSecond from '../../../../components/JustOneSecond'
import { useAuth } from '../../../../hooks'

export const ApplicationsScreen = () => {
  const { isLoading: personLoading } = useAuth()

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  return (
    <>
      <Header as="h1">Applications</Header>

      <Divider hidden />

      <ApplicationsList />
    </>
  )
}
