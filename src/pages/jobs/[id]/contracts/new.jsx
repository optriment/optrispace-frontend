import React from 'react'
import getConfig from 'next/config'
import { Header } from 'semantic-ui-react'

import { useRouter } from 'next/router'
import useSWR from 'swr'
import isJobOwner from '../../../../lib/job'
import Layout from '../../../../components/Layout'
import NewContractForm from '../../../../components/NewContractForm'
import JustOneSecond from '../../../../components/JustOneSecond'
import { fetcher, fetchWithToken } from '../../../../lib/fetcher'
import { useAuth } from '../../../../hooks'
import ErrorWrapper from '../../../../components/ErrorWrapper'

const { publicRuntimeConfig } = getConfig()

const useJob = () => {
  const { query } = useRouter()
  const { data: job, error } = useSWR(
    () => query.id && `${publicRuntimeConfig.api_url}/jobs/${query.id}`,
    fetcher
  )

  if (error) return { error }
  if (!job) return { isLoading: true }

  return { job }
}

const useApplication = () => {
  const { query } = useRouter()
  const { token } = useAuth()
  const { data: application, error } = useSWR(
    () =>
      token &&
      query.application_id && [
        `${publicRuntimeConfig.api_url}/applications/${query.application_id}`,
        token,
      ],
    fetchWithToken
  )

  if (error) return { error }
  if (!application) return { isLoading: true }

  return { application }
}

const NewContractPage = () => {
  const { person, token } = useAuth()
  const { job, isLoading, error } = useJob()
  const {
    application,
    isLoading: isApplicationLoading,
    error: applicationError,
  } = useApplication()

  return (
    <>
      <Header as="h1">Add New Contract</Header>

      {error && <ErrorWrapper header="Failed to load job" error={error} />}

      {isLoading && <JustOneSecond />}

      {job && (
        <>
          {!isJobOwner(job, person) && (
            <ErrorWrapper header="You don't have access to this action" />
          )}

          {applicationError && (
            <ErrorWrapper
              header="Failed to load application"
              error={applicationError}
            />
          )}

          {isApplicationLoading && <JustOneSecond />}

          {application && (
            <>
              {application.job.id !== job.id ? (
                <ErrorWrapper header="You don't have access to this action" />
              ) : (
                <NewContractForm
                  job={job}
                  token={token}
                  application={application}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

NewContractPage.requiresAuth = true

NewContractPage.getLayout = (page) => (
  <Layout
    meta={{
      title: 'New Contract | Optrispace',
      description: 'Welcome to Optrispace',
    }}
  >
    {page}
  </Layout>
)

export default NewContractPage
