import React, { useState, useEffect } from 'react'

import useSWR from 'swr'
import { fetchWithToken } from '../../lib/fetcher'
import getConfig from 'next/config'
import { Button, Input, Form, Header, TextArea } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import JustOneSecond from '../JustOneSecond'
import { useAuth } from '../../hooks'
import { createApplication } from '../../lib/api'
import ErrorWrapper from '../ErrorWrapper'

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

const ApplicationForm = ({ job }) => {
  const { token } = useAuth()
  const router = useRouter()

  const {
    applications,
    isLoading,
    error: applicationLoadingError,
  } = useApplications()

  const initialFields = {
    comment: '',
    price: '',
  }

  const [application, setApplication] = useState(null)
  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState(undefined)

  const handleCreateApplication = (e) => {
    e.preventDefault()
    setError(null)

    try {
      createApplication(token, job.id, { ...fields })
        .then((result) => {
          if (!result.id) {
            setError(result.message)

            return
          }

          router.reload()
        })
        .catch((err) => {
          console.error({ err })

          setError(err)
        })
    } catch (err) {
      console.error({ err })

      setError(err.message)
    }
  }

  const handleInputChange = (e) => {
    setFields({ ...fields, ...{ [e.target.id]: e.target.value } })
  }

  useEffect(() => {
    if (isLoading) return
    if (applications.length === 0) return

    setApplication(applications[0])
    setFields({
      comment: applications[0].comment,
      price: applications[0].price,
    })
  }, [isLoading, applications])

  if (applicationLoadingError) {
    return (
      <ErrorWrapper
        header="Unable to load job applications"
        error={applicationLoadingError}
      />
    )
  }

  if (isLoading) {
    return <JustOneSecond />
  }

  return (
    <>
      {application ? (
        <Header as="h3">Your reply has been published</Header>
      ) : (
        <Header as="h3">Leave a Reply</Header>
      )}

      {error && (
        <ErrorWrapper header="Unable to post an application" error={error} />
      )}

      <Form reply onSubmit={handleCreateApplication}>
        <Form.Field
          id="comment"
          control={TextArea}
          label="Comment for the customer"
          rows={5}
          required
          value={fields.comment}
          onChange={handleInputChange}
          readOnly={application !== null}
        />

        <Form.Field
          id="price"
          control={Input}
          label="The price of your services for this job (ALZ)"
          value={fields.price}
          onChange={handleInputChange}
          required
          width={5}
          readOnly={application !== null}
        />

        <Button content="Publish" primary disabled={application !== null} />
      </Form>
    </>
  )
}

export default ApplicationForm
