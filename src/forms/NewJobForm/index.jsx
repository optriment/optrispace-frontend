import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Header, Grid, Button, Form, TextArea } from 'semantic-ui-react'
import { createJob } from '../../lib/api'
import { isEmptyString } from '../../lib/validators'
import ErrorWrapper from '../../components/ErrorWrapper'
import { MarkdownIsSupported } from '../../components/MarkdownIsSupported'
import { errorHandler } from '../../lib/errorHandler'
import { getFromStorage, setToStorage } from '../../lib/helpers'
import { UnsavedChangesDialog } from '../../components/UnsavedChangesDialog'
import { Tab } from 'semantic-ui-react'
import { FormattedDescription } from '../../components/FormattedDescription'

export const NewJobForm = ({ token, coinSymbol }) => {
  const router = useRouter()

  const [displayModal, setDisplayModal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [error, setError] = useState('')

  const panes = [
    {
      menuItem: { key: 'write', icon: 'pencil', content: 'Edit' },
      render: () => <Tab.Pane>{renderWriteJob()}</Tab.Pane>,
    },
    {
      menuItem: { key: 'preview', icon: 'eye', content: 'Preview' },
      render: () => <Tab.Pane>{renderPreviewJob()}</Tab.Pane>,
    },
  ]

  const handleCreateJob = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await createJob(token, {
        title,
        description,
        budget,
      })

      clearStoredFields()

      router.push(`/jobs/${res.id}`)
    } catch (err) {
      console.error({ err })

      setError(errorHandler(err))
    }
  }

  const handleTitleChange = (e) => {
    const { value } = e.target

    setTitle(value)
    setToStorage('newJobTitle', value)
  }

  const handleDescriptionChange = (e) => {
    const { value } = e.target

    setDescription(value)
    setToStorage('newJobDescription', value)
  }

  const handleBudgetChange = (e) => {
    const { value } = e.target

    setBudget(value)
    setToStorage('newJobBudget', value)
  }

  const clearStoredFields = () => {
    localStorage.removeItem('newJobTitle')
    localStorage.removeItem('newJobDescription')
    localStorage.removeItem('newJobBudget')
  }

  const storedTitle = getFromStorage('newJobTitle')
  const storedDescription = getFromStorage('newJobDescription')
  const storedBudget = getFromStorage('newJobBudget')

  const restoreUnsavedChanges = () => {
    setTitle(storedTitle)
    setDescription(storedDescription)
    setBudget(storedBudget)
  }

  useEffect(() => {
    if (isLoaded) return

    if (storedTitle === '' && storedDescription === '' && storedBudget === '') {
      setIsLoaded(true)
    } else {
      setDisplayModal(true)
    }
  }, [isLoaded, storedTitle, storedDescription, storedBudget])

  const formFilled =
    isLoaded &&
    !isEmptyString(title) &&
    !isEmptyString(description) &&
    !isEmptyString(budget)

  const renderWriteJob = () => {
    return (
      <Form.Input
        control={TextArea}
        id="description"
        placeholder=""
        rows={12}
        value={description}
        onChange={handleDescriptionChange}
        required
      />
    )
  }

  const renderPreviewJob = () => {
    return (
      <FormattedDescription
        description={
          !isEmptyString(description)
            ? getFromStorage('newJobDescription')
            : 'Nothing to preview!'
        }
      />
    )
  }

  return (
    <>
      {error !== '' && (
        <ErrorWrapper header="Unable to create job" error={error} />
      )}

      <Form onSubmit={handleCreateJob}>
        <Grid columns={1}>
          <Grid.Column>
            <Header as="h4">Title:</Header>

            <Form.Input
              id="title"
              placeholder=""
              value={title}
              onChange={handleTitleChange}
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
              value={budget}
              onChange={handleBudgetChange}
            />
          </Grid.Column>

          <Grid.Column>
            <Button content="Publish" primary disabled={!formFilled} />
          </Grid.Column>
        </Grid>
      </Form>

      <UnsavedChangesDialog
        open={displayModal}
        onNoClicked={() => {
          clearStoredFields()
          setIsLoaded(true)
          setDisplayModal(false)
        }}
        onYesClicked={() => {
          restoreUnsavedChanges()
          setIsLoaded(true)
          setDisplayModal(false)
        }}
      />
    </>
  )
}
