import React, { useState } from 'react'

import getConfig from 'next/config'

import { Button, Grid, Header, Segment, Tab } from 'semantic-ui-react'

import ErrorPage from 'next/error'
import Link from 'next/link'

import useSWR from 'swr'
import { useFetchPerson } from '../../lib/person'
import { fetchWithToken } from '../../lib/fetcher'

import ApplicationsGroup from './ApplicationsGroup'

export default function JobCardForCustomer({
  job,
  renderDescription,
  renderStats,
}) {
  const { publicRuntimeConfig } = getConfig()

  const { person } = useFetchPerson()

  const { data: applications, error: isApplicationsError } = useSWR(
    () =>
      job.id
        ? [
            `${publicRuntimeConfig.api_url}/jobs/${job.id}/applications`,
            person.id,
          ]
        : null,
    fetchWithToken
  )

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

  if (isApplicationsError) {
    return (
      <ErrorPage
        statusCode={isApplicationsError.status}
        title={isApplicationsError.info.message}
      />
    )
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
          {panes ? (
            <Tab panes={panes} />
          ) : (
            <Header floated="left" style={{ fontSize: '1.5em' }}>
              Нет заявок
            </Header>
          )}
        </Grid.Column>
      </Grid.Row>
    </>
  )
}
