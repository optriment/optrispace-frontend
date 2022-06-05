import React, { useState } from 'react'

import getConfig from 'next/config'
import { useRouter } from 'next/router'

import { Tab } from 'semantic-ui-react'

import ErrorWrapper from '../ErrorWrapper'
import useSWR from 'swr'
import { fetchWithToken } from '../../lib/fetcher'
import { useAuth } from '../../hooks'
import ApplicationsGroup from './ApplicationsGroup'
import JustOneSecond from '../JustOneSecond'

const useApplications = () => {
  const { publicRuntimeConfig } = getConfig()
  const { token } = useAuth()
  const { query } = useRouter()

  const { data, error } = useSWR(
    () =>
      token &&
      query.id && [
        `${publicRuntimeConfig.api_url}/jobs/${query.id}/applications`,
        token,
      ],
    fetchWithToken
  )

  if (error) return { error }
  if (!data) return { isLoading: true }

  return { applications: data }
}

const Applications = ({ job }) => {
  const { applications, isLoading, error } = useApplications()

  const [panes, setPanes] = useState(undefined)

  if (applications && applications.length > 0 && !panes) {
    const applicationsWithAcceptedContracts = applications.filter(
      (application) =>
        application.contract && application.contract.status !== 'created'
    )
    const applicationsWithNotAcceptedContracts = applications.filter(
      (application) =>
        application.contract && application.contract.status === 'created'
    )
    const applicationsWithoutContracts = applications.filter(
      (application) => !application.contract
    )

    setPanes([
      ApplicationsGroup(
        job,
        'New applications',
        applicationsWithoutContracts,
        'applications'
      ),
      ApplicationsGroup(
        job,
        'Discussions',
        applicationsWithNotAcceptedContracts,
        'discussions'
      ),
      ApplicationsGroup(
        job,
        'Contract accepted',
        applicationsWithAcceptedContracts,
        'accepted'
      ),
    ])
  }

  return (
    <>
      {error && (
        <ErrorWrapper header="Failed to load applications" error={error} />
      )}

      {isLoading && <JustOneSecond />}

      {panes && <Tab panes={panes} />}
    </>
  )
}

export default Applications
