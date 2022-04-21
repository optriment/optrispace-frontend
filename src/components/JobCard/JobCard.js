import {
  Grid,
  Header,
  Icon,
  Segment,
  Statistic,
} from 'semantic-ui-react';

import { useFetchPerson } from '../../lib/person'
import { isJobOwner } from '../../lib/job';

import JobCardForCustomer from './JobCardForCustomer';
import JobCardForApplicant from './JobCardForApplicant';
import JobCardForGuest from './JobCardForGuest';

export default function JobCard({ job }) {
  const { person } = useFetchPerson();

  // FIXME: Сомневаюсь по поводу этого условия для isGuest
  const isGuest = !person;

  let isOwner = false;
  let isApplicant = false;

  isOwner = isJobOwner(job, person);
  isApplicant = !isOwner;

  const defaultHeader = (job) => {
    return (
      <Grid.Row>
        <Grid.Column>
          <Segment clearing padded>
            <Header as='h1' style={{ fontSize: '2em' }}>
              {job.title}
            </Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    )
  }

  const defaultDescription = (job) => {
    return (
      <Grid.Row>
        <Grid.Column>
          <Segment padded>
            {job.description.split('\n').map((str, idx) => <p key={idx}>{str}</p>)}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    )
  }

  const defaultStats = (job) => {
    return (
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Statistic.Group widths='5' size='mini'>
              <Statistic>
                <Statistic.Value>0.0</Statistic.Value>
                <Statistic.Label><Icon name='star' /> Рейтинг заказчика</Statistic.Label>
              </Statistic>
              {job.budget && (
                <Statistic>
                  <Statistic.Value>{job.budget}</Statistic.Value>
                  <Statistic.Label><Icon name='money' /> Бюджет (COIN)</Statistic.Label>
                </Statistic>
              )}
              <Statistic>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label><Icon name='eye' /> Просмотров</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{job.applications_count}</Statistic.Value>
                <Statistic.Label><Icon name='like' /> Заявок</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{job.duration}</Statistic.Value>
                <Statistic.Label><Icon name='clock' /> Длительность проекта</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    )
  }

  return (
    <Grid container stackable verticalAlign='middle'>
      {isOwner && (
        <JobCardForCustomer
          job={job}
          renderDescription={defaultDescription(job)}
          renderStats={defaultStats(job)}
        />
      )}

      {isApplicant && (
        <JobCardForApplicant
          job={job}
          renderHeader={defaultHeader(job)}
          renderDescription={defaultDescription(job)}
          renderStats={defaultStats(job)}
        />
      )}

      {isGuest && (
        <JobCardForGuest
          job={job}
          renderHeader={defaultHeader(job)}
          renderDescription={defaultDescription(job)}
          renderStats={defaultStats(job)}
        />
      )}
    </Grid>
  )
}
