import getConfig from 'next/config'

import {
  Grid,
  Header,
  Segment,
  Message,
} from 'semantic-ui-react';

import useSWR from 'swr';
import { fetcher } from '../../lib/fetcher';

import JobsList from '../../components/JobsList';

export default function JobsIndex() {
  const { publicRuntimeConfig } = getConfig()

  const { data, error } = useSWR(`${publicRuntimeConfig.api_url}/jobs`, fetcher);

  if (error) {
    return (
      <Message negative>
        <Message.Header>Failed to load jobs</Message.Header>
        <p>{error}</p>
      </Message>
    )
  }

  return (
    <Segment vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' style={{ fontSize: '3em' }}>
              Jobs
            </Header>

            {data
              ? (<JobsList jobs={data} />)
              : (<div>Loading jobs...</div>)
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
