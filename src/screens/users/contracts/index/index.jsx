import React from 'react'
import { Divider, Header } from 'semantic-ui-react'
import ContractsList from '../../../../components/ContractsList'
import JustOneSecond from '../../../../components/JustOneSecond'
import { useAuth } from '../../../../hooks'

export const ContractsScreen = () => {
  const { isLoading: personLoading } = useAuth()

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  return (
    <>
      <Header as="h1">Contracts</Header>

      <Divider hidden />

      <ContractsList />
    </>
  )
}
