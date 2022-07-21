import React from 'react'
import JustOneSecond from '../../../../components/JustOneSecond'
import { NewJobForm } from '../../../../forms/NewJobForm'
import { useAuth } from '../../../../hooks'

export const NewJobScreen = () => {
  const { isLoading: personLoading, token } = useAuth()

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  return <NewJobForm token={token} />
}
