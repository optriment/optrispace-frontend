import React, { useContext } from 'react'
import ErrorWrapper from '../../components/ErrorWrapper'
import JustOneSecond from '../../components/JustOneSecond'
import Web3Context from '../../context/web3-context'
import { useAuth } from '../../hooks'
import { useContracts } from '../../hooks/useContracts'
import { LandingLayout } from '../../layouts/Landing'
import { UsersLayout } from '../../layouts/Users'
import { ContractsScreen } from '../../screens/users/contracts/index'

const Page = () => {
  const {
    isLoading: personLoading,
    error: personError,
    isAuthenticated,
    person,
    token,
  } = useAuth()
  const {
    contracts,
    isLoading: contractsLoading,
    error: contractsError,
  } = useContracts(token)
  const { tokenSymbol } = useContext(Web3Context)

  if (personLoading) {
    return (
      <LandingLayout>
        <JustOneSecond title="Loading profile..." />
      </LandingLayout>
    )
  }

  if (personError) {
    return (
      <LandingLayout>
        <ErrorWrapper header="Internal Server Error" error={personError} />
      </LandingLayout>
    )
  }

  if (!isAuthenticated) {
    return (
      <LandingLayout>
        <ErrorWrapper header="Please sign in" />
      </LandingLayout>
    )
  }

  if (contractsLoading) {
    return (
      <UsersLayout meta={{ title: 'Contracts' }}>
        <JustOneSecond title="Loading contracts..." />
      </UsersLayout>
    )
  }

  if (contractsError) {
    return (
      <UsersLayout meta={{ title: 'Contracts' }}>
        <ErrorWrapper
          header="Unable to load contracts"
          error={contractsError}
        />
      </UsersLayout>
    )
  }

  return (
    <UsersLayout meta={{ title: 'Contracts' }}>
      <ContractsScreen
        contracts={contracts}
        person={person}
        tokenSymbol={tokenSymbol}
      />
    </UsersLayout>
  )
}

Page.requiresAuth = true

export default Page
