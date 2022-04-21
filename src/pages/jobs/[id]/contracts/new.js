import getConfig from 'next/config'
import {
  Message,
  Segment,
} from 'semantic-ui-react';

import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useFetchPerson } from '../../../../lib/person'
import { isJobOwner } from '../../../../lib/job'
import NewContractForm from '../../../../components/NewContractForm'

import { fetcher } from '../../../../lib/fetcher';

export default function NewContract() {
  const { publicRuntimeConfig } = getConfig()

  const { person } = useFetchPerson();

  const { query } = useRouter();
  const { data: job, error: jobError } = useSWR(
    () => query.id && `${publicRuntimeConfig.api_url}/jobs/${query.id}`,
    fetcher
  );

  const { data: application, error: applicationError } = useSWR(
    () => query.application_id && `${publicRuntimeConfig.api_url}/applications/${query.application_id}`,
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
          <Message.Header>You can not create contract for not your own job</Message.Header>
        </Message>
      </Segment>
    )
  }

  if (applicationError) {
    return (
      <Segment vertical>
        <Message negative>
          <Message.Header>Failed to load application</Message.Header>
          <p>{applicationError.info.message}</p>
        </Message>
      </Segment>
    )
  }

  if (!application) {
    return (
      <Segment vertical>
        <p>Loading application...</p>
      </Segment>
    )
  }

  if (application.job.id !== job.id) {
    return (
      <Segment vertical>
        <Message negative>
          <Message.Header>Application&apos;s job does not match with current job</Message.Header>
        </Message>
      </Segment>
    )
  }

  return (
    <Segment vertical>
      <NewContractForm job={job} person={person} application={application} />
    </Segment>
  )
}
