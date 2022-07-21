import React from 'react'
import JustOneSecond from '../../../../components/JustOneSecond'
import { EditJobForm } from '../../../../forms/EditJobForm'
import { useAuth } from '../../../../hooks'

export const EditJobScreen = ({ job }) => {
  const { isLoading: personLoading, token } = useAuth()

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  return <EditJobForm job={job} token={token} />
}
