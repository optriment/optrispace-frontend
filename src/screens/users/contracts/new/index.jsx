import React from 'react'
import ErrorWrapper from '../../../../components/ErrorWrapper'
import { ProfileIsNotConfigured } from '../../../../components/ProfileIsNotConfigured'
import { NewContractForm } from '../../../../forms/NewContractForm'
import { isEmptyString } from '../../../../lib/validators'

export const NewContractScreen = ({
  job,
  application,
  person,
  token,
  coinSymbol,
}) => {
  if (isEmptyString(person.ethereum_address)) {
    return <ProfileIsNotConfigured />
  }

  const { applicant } = application

  if (isEmptyString(applicant.ethereum_address)) {
    return (
      <ErrorWrapper
        header="You can not create contract right now"
        error="Applicant does not have configured wallet address"
      />
    )
  }

  return (
    <NewContractForm
      job={job}
      application={application}
      token={token}
      coinSymbol={coinSymbol}
    />
  )
}
