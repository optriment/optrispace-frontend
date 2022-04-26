import React, { useState } from 'react'

import getConfig from 'next/config'
import { useRouter } from 'next/router'

import { Button, Grid, Header, Segment, Tab } from 'semantic-ui-react'

import ErrorWrapper from '../ErrorWrapper'
import Link from 'next/link'
import JustOneSecond from '../JustOneSecond'

import useSWR from 'swr'
import { fetchWithToken } from '../../lib/fetcher'
import { useAuth } from '../../hooks'

import ApplicationsGroup from './ApplicationsGroup'

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

export default function JobCardForCustomer({
  job,
  renderDescription,
  renderStats,
}) {
  const { applications, isLoading, error } = useApplications()

  const [panes, setPanes] = useState(undefined)

  if (applications && applications.length > 0 && !panes) {
    const applicationsWithSignedContracts = applications.filter(
      (application) =>
        application.contract && application.contract.status === 'signed'
    )
    const applicationsWithUnsignedContracts = applications.filter(
      (application) =>
        application.contract && application.contract.status !== 'signed'
    )
    const applicationsWithoutContracts = applications.filter(
      (application) => !application.contract
    )

    setPanes([
      ApplicationsGroup(
        job,
        'Заявки',
        applicationsWithoutContracts,
        'applications'
      ),
      ApplicationsGroup(
        job,
        'Обсуждение',
        applicationsWithUnsignedContracts,
        'discussions'
      ),
      ApplicationsGroup(
        job,
        'Контракт подписан',
        applicationsWithSignedContracts,
        'signed'
      ),
    ])
  }

  const renderHeader = (jobItem) => {
    return (
      <Grid.Row>
        <Grid.Column>
          <Segment clearing padded>
            <Link
              href="/jobs/[id]/edit"
              as={`/jobs/${jobItem.id}/edit`}
              passHref
            >
              <Button
                content="Редактировать"
                floated="right"
                size="tiny"
                labelPosition="left"
                icon="pencil"
              />
            </Link>

            <Header floated="left" as="h1" style={{ fontSize: '2em' }}>
              {jobItem.title}
            </Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    )
  }

  return (
    <>
      {renderHeader(job)}

      {renderDescription}

      {renderStats}

      <Grid.Row>
        <Grid.Column>
          {error && (
            <ErrorWrapper header="Failed to load applications" error={error} />
          )}

          {isLoading && <JustOneSecond />}

          {panes && <Tab panes={panes} />}
        </Grid.Column>
      </Grid.Row>
    </>
  )
}
