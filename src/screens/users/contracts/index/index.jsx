import React, { useContext } from 'react'
import { Divider, Header } from 'semantic-ui-react'
import ContractsList from '../../../../components/ContractsList'
import JustOneSecond from '../../../../components/JustOneSecond'
import Web3Context from '../../../../context/web3-context'
import { useAuth } from '../../../../hooks'

export const ContractsScreen = () => {
  const { isLoading: personLoading } = useAuth()
  const { tokenSymbol } = useContext(Web3Context)

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  return (
    <>
      <Header as="h1">Contracts</Header>

      <Divider hidden />

      <ContractsList currencyLabel={tokenSymbol} />
    </>
  )
}
