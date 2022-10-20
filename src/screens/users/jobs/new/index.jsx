import React from 'react'
import { ProfileIsNotConfigured } from '../../../../components/ProfileIsNotConfigured'
import { NewJobForm } from '../../../../forms/NewJobForm'
import { isEmptyString } from '../../../../lib/validators'

export const NewJobScreen = ({ person, token, coinSymbol }) => {
  if (isEmptyString(person.ethereum_address)) {
    return <ProfileIsNotConfigured />
  }

  return <NewJobForm person={person} token={token} coinSymbol={coinSymbol} />
}
