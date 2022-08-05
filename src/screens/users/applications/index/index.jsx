import React, { useContext } from 'react'
import { Divider, Header } from 'semantic-ui-react'
import ApplicationsList from '../../../../components/ApplicationsList'
import JustOneSecond from '../../../../components/JustOneSecond'
import { useAuth } from '../../../../hooks'
import Web3Context from '../../../../context/web3-context'

export const ApplicationsScreen = () => {
  const { isLoading: personLoading } = useAuth()
  const { tokenSymbol } = useContext(Web3Context)

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  return (
    <>
      <Header as="h1">Applications</Header>

      <Divider hidden />

      <ApplicationsList currencyLabel={tokenSymbol} />
    </>
  )
}
