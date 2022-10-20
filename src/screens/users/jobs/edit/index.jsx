import React from 'react'
import { ProfileIsNotConfigured } from '../../../../components/ProfileIsNotConfigured'
import { EditJobForm } from '../../../../forms/EditJobForm'
import { isEmptyString } from '../../../../lib/validators'

export const EditJobScreen = ({ job, person, token, coinSymbol }) => {
  if (isEmptyString(person.ethereum_address)) {
    return <ProfileIsNotConfigured />
  }

  return <EditJobForm job={job} token={token} coinSymbol={coinSymbol} />
}
