import React, { useContext } from 'react'
import JustOneSecond from '../../../../components/JustOneSecond'
import Web3Context from '../../../../context/web3-context'
import { NewContractForm } from '../../../../forms/NewContractForm'
import { useAuth } from '../../../../hooks'

export const NewContractScreen = ({ job, application }) => {
  const { isLoading: personLoading, token } = useAuth()
  const { tokenSymbol } = useContext(Web3Context)

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  return (
    <NewContractForm
      job={job}
      application={application}
      token={token}
      currencyLabel={tokenSymbol}
    />
  )
}
