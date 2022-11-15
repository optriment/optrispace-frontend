import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Header, Grid, Button, Form, TextArea } from 'semantic-ui-react'
import { updateJob } from '../../lib/api'
import ErrorWrapper from '../../components/ErrorWrapper'
import { isEmptyString } from '../../lib/validators'
import { getFromStorage, setToStorage } from '../../lib/helpers'
import { MarkdownIsSupported } from '../../components/MarkdownIsSupported'
import { errorHandler } from '../../lib/errorHandler'
import { Tab } from 'semantic-ui-react'
import { FormattedDescription } from '../../components/FormattedDescription'

export const EditJobForm = ({ job, token, coinSymbol }) => {
  const router = useRouter()

  const initialFields = {
    title: job.title,
    description: job.description,
    budget: job.budget,
  }

  const panes = [
    {
      menuItem: { key: 'write', icon: 'pencil', content: 'Edit' },
      render: () => <Tab.Pane>{renderEditJob()}</Tab.Pane>,
    },
    {
      menuItem: { key: 'preview', icon: 'eye', content: 'Preview' },
      render: () => <Tab.Pane>{renderPreviewJob()}</Tab.Pane>,
    },
  ]

  const [fields, setFields] = useState(initialFields)
  const [error, setError] = useState('')
  const [formFilled, setFormFilled] = useState(false)

  const handleEditJob = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await updateJob(token, job.id, { ...fields })

      localStorage.removeItem(`editjobTitle-${job.id}`)
      localStorage.removeItem(`editjobBudget-${job.id}`)
      localStorage.removeItem(`editjobDescription-${job.id}`)

      router.push(`/jobs/${res.id}`)
    } catch (err) {
      console.error({ err })

      setError(errorHandler(err))
    }
  }

  const handleInputChange = (e) => {
    setFields({ ...fields, ...{ [e.target.id]: e.target.value } })
  }

  useEffect(() => {
    setFormFilled(
      !isEmptyString(fields.title) &&
        !isEmptyString(fields.description) &&
        !isEmptyString(fields.budget)
    )
  }, [fields])

  const setLocalJobTitle = (jobTitle) => {
    setToStorage(`editjobTitle-${job.id}`, jobTitle)
  }

  const setLocalJobBudget = (jobBudget) => {
    setToStorage(`editjobBudget-${job.id}`, jobBudget)
  }

  const setLocalJobDescription = (jobDescription) => {
    setToStorage(`editjobDescription-${job.id}`, jobDescription)
  }

  const renderEditJob = () => {
    return (
      <Form.Input
        control={TextArea}
        id="description"
        placeholder=""
        rows={12}
        defaultValue={
          localStorage.getItem(`editjobDescription-${job.id}`) ??
          fields.description
        }
        onChange={(event) => {
          handleInputChange(event)
          setLocalJobDescription(event.target.value)
        }}
        required
      />
    )
  }

  const renderPreviewJob = () => {
    return (
      <FormattedDescription
        description={
          !isEmptyString(fields.description)
            ? getFromStorage(`editjobDescription-${job.id}`) ||
              fields.description
            : 'Nothing to preview!'
        }
      />
    )
  }

  return (
    <>
      {error !== '' && (
        <ErrorWrapper header="Unable to update job" error={error} />
      )}

      <Form onSubmit={handleEditJob}>
        <Grid columns={1}>
          <Grid.Column>
            <Header as="h4">Title:</Header>

            <Form.Input
              id="title"
              placeholder=""
              defaultValue={
                localStorage.getItem(`editjobTitle-${job.id}`) ?? fields.title
              }
              onChange={(event) => {
                handleInputChange(event)
                setLocalJobTitle(event.target.value)
              }}
              required
            />
          </Grid.Column>

          <Grid.Column>
            <Header as="h4">Description:</Header>
            <Tab panes={panes} />

            <MarkdownIsSupported />
          </Grid.Column>

          <Grid.Column computer={3} tablet={4} mobile={8}>
            <Header as="h4">{`Budget (${coinSymbol}):`}</Header>

            <Form.Input
              id="budget"
              type="number"
              min={0.0}
              step={0.001}
              placeholder=""
              defaultValue={
                localStorage.getItem(`editjobBudget-${job.id}`) ?? fields.budget
              }
              onChange={(event) => {
                handleInputChange(event)
                setLocalJobBudget(event.target.value)
              }}
              required
            />
          </Grid.Column>

          <Grid.Column>
            <Button content="Update" primary disabled={!formFilled} />
          </Grid.Column>
        </Grid>
      </Form>
    </>
  )
}
