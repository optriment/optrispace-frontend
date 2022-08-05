import React, { useContext } from 'react'
import JustOneSecond from '../../../../components/JustOneSecond'
import Web3Context from '../../../../context/web3-context'
import { EditJobForm } from '../../../../forms/EditJobForm'
import { useAuth } from '../../../../hooks'

export const EditJobScreen = ({ job }) => {
  const { isLoading: personLoading, token } = useAuth()
  const { tokenSymbol } = useContext(Web3Context)

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  return <EditJobForm job={job} token={token} currencyLabel={tokenSymbol} />
}
