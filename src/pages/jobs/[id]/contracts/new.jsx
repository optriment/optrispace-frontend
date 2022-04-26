import React from 'react'
import getConfig from 'next/config'
import { Segment } from 'semantic-ui-react'

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

const Page = () => {
  const { person, token } = useAuth()
  const { job, isLoading, error } = useJob()
  const {
    application,
    isLoading: isApplicationLoading,
    error: applicationError,
  } = useApplication()

  if (error) {
    return (
      <Layout>
        <Segment vertical>
          <ErrorWrapper header="Failed to load job" error={error} />
        </Segment>
      </Layout>
    )
  }

  if (isLoading) {
    return (
      <Layout>
        <Segment vertical>
          <JustOneSecond />
        </Segment>
      </Layout>
    )
  }

  if (!isJobOwner(job, person)) {
    return (
      <Layout>
        <Segment vertical>
          <ErrorWrapper header="You don't have access to this action" />
        </Segment>
      </Layout>
    )
  }

  if (applicationError) {
    return (
      <Layout>
        <Segment vertical>
          <ErrorWrapper
            header="Failed to load application"
            error={applicationError}
          />
        </Segment>
      </Layout>
    )
  }

  if (isApplicationLoading) {
    return (
      <Layout>
        <Segment vertical>
          <JustOneSecond />
        </Segment>
      </Layout>
    )
  }

  if (application.job.id !== job.id) {
    return (
      <Layout>
        <Segment vertical>
          <ErrorWrapper header="You don't have access to this action" />
        </Segment>
      </Layout>
    )
  }

  return (
    <Layout>
      <Segment vertical>
        <NewContractForm job={job} token={token} application={application} />
      </Segment>
    </Layout>
  )
}

Page.requiresAuth = true
Page.redirectUnauthenticatedTo = '/sign_in'

export default Page
