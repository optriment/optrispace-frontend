import getConfig from 'next/config'
import {
  Message,
  Segment,
} from 'semantic-ui-react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useFetchPerson } from '../../../lib/person'
import { fetcher } from '../../../lib/fetcher';
import EditJobForm from '../../../components/EditJobForm';
import { isJobOwner } from '../../../lib/job';

export default function JobEditPage() {
  const { publicRuntimeConfig } = getConfig()

  const { person } = useFetchPerson();

  const { query } = useRouter();
  const { data: job, error: jobError } = useSWR(
    () => query.id && `${publicRuntimeConfig.api_url}/jobs/${query.id}`,
    fetcher
  );

  if (!person) {
    return (
      <Segment vertical>
        <p>Loading person...</p>
      </Segment>
    )
  }

  if (jobError) {
    return (
      <Segment vertical>
        <Message negative>
          <Message.Header>Failed to load job</Message.Header>
          <p>{jobError.info.message}</p>
        </Message>
      </Segment>
    )
  }

  if (!job) {
    return (
      <Segment vertical>
        <p>Loading job...</p>
      </Segment>
    )
  }

  if (!isJobOwner(job, person)) {
    return (
      <Segment vertical>
        <Message negative>
          <Message.Header>You can not edit this job</Message.Header>
        </Message>
      </Segment>
    )
  }

  return (
    <Segment vertical>
       <EditJobForm job={job} />
    </Segment>
  )
}
