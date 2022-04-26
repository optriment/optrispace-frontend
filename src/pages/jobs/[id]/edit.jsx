import React from 'react'
import getConfig from 'next/config'
import { Segment } from 'semantic-ui-react'
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

const Page = () => {
  const { job, isLoading, error } = useJob()
  const { person } = useAuth()

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

  return (
    <Layout>
      <Segment vertical>
        <EditJobForm job={job} />
      </Segment>
    </Layout>
  )
}

Page.requiresAuth = true
Page.redirectUnauthenticatedTo = '/sign_in'

export default Page
