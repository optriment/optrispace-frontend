import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Header, Button, Form, TextArea } from 'semantic-ui-react'
import { createJob } from '../../lib/api'
import { isEmptyString } from '../../lib/validators'
import ErrorWrapper from '../../components/ErrorWrapper'
import { MarkdownIsSupported } from '../../components/MarkdownIsSupported'
import { errorHandler } from '../../lib/errorHandler'
import { getFromStorage, setToStorage } from '../../lib/helpers'
import { UnsavedChangesDialog } from '../../components/UnsavedChangesDialog'

export const NewJobForm = ({ token, coinSymbol }) => {
  const router = useRouter()

  const [displayModal, setDisplayModal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [error, setError] = useState('')

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

  return (
    <>
      <Header as="h1">Add New Job</Header>

      {error !== '' && (
        <ErrorWrapper header="Unable to create job" error={error} />
      )}

      <Form onSubmit={handleCreateJob}>
        <Form.Group>
          <Form.Input
            id="title"
            label="Title"
            placeholder=""
            value={title}
            onChange={handleTitleChange}
            required
            width={12}
          />

          <Form.Input
            id="budget"
            type="number"
            min={0.0}
            step={0.01}
            label={`Approx. budget (${coinSymbol})`}
            placeholder=""
            value={budget}
            onChange={handleBudgetChange}
            width={4}
          />
        </Form.Group>

        <Form.Input
          control={TextArea}
          id="description"
          label="Description"
          placeholder=""
          rows={12}
          value={description}
          onChange={handleDescriptionChange}
          required
        />

        <MarkdownIsSupported />

        <Button content="Publish" primary disabled={!formFilled} />
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
