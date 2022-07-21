import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import ErrorWrapper from '../../../components/ErrorWrapper'
import JustOneSecond from '../../../components/JustOneSecond'
import { useAuth } from '../../../hooks'
import { UsersLayout } from '../../../layouts/Users'
import { useContract } from '../../../hooks/useContract'
import { ContractScreen } from '../../../screens/users/contracts/show'
import DisplayContext from '../../../context/display-context'
import { LandingLayout } from '../../../layouts/Landing'

const Page = () => {
  const { query } = useRouter()
  const { isLoading: personLoading, isAuthenticated, token } = useAuth()
  const {
    contract,
    isLoading: contractLoading,
    error: contractError,
  } = useContract(token, query.id)
  const { setSmallScreen } = useContext(DisplayContext)

  useEffect(() => {
    setSmallScreen(window.matchMedia('(max-width: 700px)').matches)
  }, [])

  if (personLoading) {
    return (
      <LandingLayout>
        <JustOneSecond title="Loading profile..." />
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

  return (
    <UsersLayout meta={{ title: `Contract: ${contract.title}` }}>
      <ContractScreen contract={contract} />
    </UsersLayout>
  )
}

Page.requiresAuth = true

export default Page
