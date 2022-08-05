import React, { useContext } from 'react'
import JustOneSecond from '../../../../components/JustOneSecond'
import Web3Context from '../../../../context/web3-context'
import { NewJobForm } from '../../../../forms/NewJobForm'
import { useAuth } from '../../../../hooks'

export const NewJobScreen = () => {
  const { isLoading: personLoading, token } = useAuth()
  const { tokenSymbol } = useContext(Web3Context)

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  return <NewJobForm token={token} currencyLabel={tokenSymbol}/>
}
