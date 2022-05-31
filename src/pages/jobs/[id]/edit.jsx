import React from 'react'
import getConfig from 'next/config'
import { Header } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '../../../lib/fetcher'
import Layout from '../../../components/Layout'
import EditJobForm from '../../../components/EditJobForm'
import isJobOwner from '../../../lib/job'
import { useAuth } from '../../../hooks'
import JustOneSecond from '../../../components/JustOneSecond'
import ErrorWrapper from '../../../components/ErrorWrapper'

const useJob = () => {
  const { publicRuntimeConfig } = getConfig()
  const { query } = useRouter()

  const { data: job, error } = useSWR(
    () => query.id && `${publicRuntimeConfig.api_url}/jobs/${query.id}`,
    fetcher
  )

  if (error) return { error }
  if (!job) return { isLoading: true }

  return { job }
}

const EditJobPage = () => {
  const { job, isLoading, error } = useJob()
  const { person } = useAuth()

  return (
    <>
      <Header as="h1">Edit Job</Header>

      {error && <ErrorWrapper header="Failed to load job" error={error} />}

      {isLoading && <JustOneSecond />}

      {job && (
        <>
          {!isJobOwner(job, person) && (
            <ErrorWrapper header="You don't have access to this action" />
          )}

          <EditJobForm job={job} />
        </>
      )}
    </>
  )
}

EditJobPage.requiresAuth = true

EditJobPage.getLayout = (page) => (
  <Layout
    meta={{
      title: 'Edit Job | Optrispace',
      description: 'Welcome to Optrispace',
    }}
  >
    {page}
  </Layout>
)

export default EditJobPage