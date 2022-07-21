import React from 'react'
import JustOneSecond from '../../../../components/JustOneSecond'
import { NewContractForm } from '../../../../forms/NewContractForm'
import { useAuth } from '../../../../hooks'

export const NewContractScreen = ({ job, application }) => {
  const { isLoading: personLoading, token } = useAuth()

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  return <NewContractForm job={job} application={application} token={token} />
}
