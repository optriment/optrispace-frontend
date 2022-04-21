import getConfig from 'next/config'
import { Message, Segment } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { fetcher } from '../../lib/fetcher';
import JobCard from '../../components/JobCard/JobCard';

export default function Job() {
  const { publicRuntimeConfig } = getConfig()

  const { query } = useRouter();

  const { data: job, error: jobError } = useSWR(
    () => query.id && `${publicRuntimeConfig.api_url}/jobs/${query.id}`,
    fetcher
  );

  if (jobError) {
    return (
      <Message negative>
        <Message.Header>Failed to load job</Message.Header>
        <p>{jobError.info.message}</p>
      </Message>
    )
  }

  if (!job) {
    return (
      <Segment vertical>
        <p>Loading job...</p>
      </Segment>
    )
  }

  return (
    <Segment vertical>
       <JobCard job={job} />
    </Segment>
  )
}
