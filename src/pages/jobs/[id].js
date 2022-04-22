import getConfig from 'next/config'
import { Message, Segment } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { fetcher } from '../../lib/fetcher';
import JobCard from '../../components/JobCard/JobCard';
import ErrorWrapper from '../../components/ErrorWrapper';

export default function Job() {
  const { publicRuntimeConfig } = getConfig()

  const { query } = useRouter();

  const { data: job, error: jobError } = useSWR(
    () => query.id && `${publicRuntimeConfig.api_url}/jobs/${query.id}`,
    fetcher
  );

  if (jobError) {
    return (
      <ErrorWrapper
        header='Failed to load job'
        error={jobError}
      />
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
