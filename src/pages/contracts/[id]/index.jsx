import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import ErrorWrapper from '../../../components/ErrorWrapper'
import JustOneSecond from '../../../components/JustOneSecond'
import { useAuth } from '../../../hooks'
import { UsersLayout } from '../../../layouts/Users'
import { useContract } from '../../../hooks/useContract'
import { useApplicationChat } from '../../../hooks/useApplicationChat'
import { ContractScreen } from '../../../screens/users/contracts/show'
import { LandingLayout } from '../../../layouts/Landing'
import Web3Context from '../../../context/web3-context'

const Page = () => {
  const { query } = useRouter()
  const {
    isLoading: personLoading,
    error: personError,
    isAuthenticated,
    person,
    token,
  } = useAuth()
  const {
    contract,
    isLoading: contractLoading,
    error: contractError,
  } = useContract(token, query.id)
  const {
    chat,
    isLoading: chatLoading,
    error: chatError,
  } = useApplicationChat(token, contract?.application_id)

  const { coinSymbol } = useContext(Web3Context)

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
        <ErrorWrapper header="Authorization Error" error={personError} />
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

  if (contractLoading) {
    return (
      <UsersLayout>
        <JustOneSecond title="Loading contract..." />
      </UsersLayout>
    )
  }

  if (contractError) {
    return (
      <UsersLayout>
        <ErrorWrapper header="Unable to load contract" error={contractError} />
      </UsersLayout>
    )
  }

  if (chatLoading) {
    return (
      <UsersLayout>
        <JustOneSecond title="Loading chat..." />
      </UsersLayout>
    )
  }

  if (chatError) {
    return (
      <UsersLayout>
        <ErrorWrapper header="Unable to load chat" error={chatError} />
      </UsersLayout>
    )
  }

  return (
    <UsersLayout meta={{ title: `Contract: ${contract.title}` }}>
      <ContractScreen
        contract={contract}
        person={person}
        token={token}
        coinSymbol={coinSymbol}
        chat={chat}
      />
    </UsersLayout>
  )
}

Page.requiresAuth = true

export default Page
