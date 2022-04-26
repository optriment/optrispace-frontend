import React from 'react'
import { Grid, Header, Icon, Segment, Statistic } from 'semantic-ui-react'

import isJobOwner from '../../lib/job'
import { useAuth } from '../../hooks'

import JobCardForCustomer from './JobCardForCustomer'
import JobCardForApplicant from './JobCardForApplicant'
import JobCardForGuest from './JobCardForGuest'

export default function JobCard({ job }) {
  const { person } = useAuth()

  const isOwner = person && isJobOwner(job, person)
  const isApplicant = person && !isOwner

  const defaultHeader = (jobItem) => {
    return (
      <Grid.Row>
        <Grid.Column>
          <Segment clearing padded>
            <Header as="h1" style={{ fontSize: '2em' }}>
              {jobItem.title}
            </Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    )
  }

  const defaultDescription = (jobItem) => {
    return (
      <Grid.Row>
        <Grid.Column>
          <Segment padded>
            {jobItem.description.split('\n').map((str, idx) => (
              <p key={idx}>{str}</p>
            ))}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    )
  }

  const defaultStats = (jobItem) => {
    return (
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Statistic.Group widths="5" size="mini">
              <Statistic>
                <Statistic.Value>0.0</Statistic.Value>
                <Statistic.Label>
                  <Icon name="star" /> Рейтинг заказчика
                </Statistic.Label>
              </Statistic>
              {jobItem.budget && (
                <Statistic>
                  <Statistic.Value>{jobItem.budget}</Statistic.Value>
                  <Statistic.Label>
                    <Icon name="money" /> Бюджет (COIN)
                  </Statistic.Label>
                </Statistic>
              )}
              <Statistic>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label>
                  <Icon name="eye" /> Просмотров
                </Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{jobItem.applications_count}</Statistic.Value>
                <Statistic.Label>
                  <Icon name="like" /> Заявок
                </Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{jobItem.duration}</Statistic.Value>
                <Statistic.Label>
                  <Icon name="clock" /> Длительность проекта
                </Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    )
  }

  if (isOwner) {
    return (
      <Grid container stackable verticalAlign="middle">
        <JobCardForCustomer
          job={job}
          renderDescription={defaultDescription(job)}
          renderStats={defaultStats(job)}
        />
      </Grid>
    )
  }

  if (isApplicant) {
    return (
      <Grid container stackable verticalAlign="middle">
        <JobCardForApplicant
          job={job}
          renderHeader={defaultHeader(job)}
          renderDescription={defaultDescription(job)}
          renderStats={defaultStats(job)}
        />
      </Grid>
    )
  }

  return (
    <Grid container stackable verticalAlign="middle">
      <JobCardForGuest
        job={job}
        renderHeader={defaultHeader(job)}
        renderDescription={defaultDescription(job)}
        renderStats={defaultStats(job)}
      />
    </Grid>
  )
}
