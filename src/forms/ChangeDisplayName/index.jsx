import React, { useState } from 'react'
import { Input } from 'semantic-ui-react'

import ErrorWrapper from '../../components/ErrorWrapper'
import SuccessWrapper from '../../components/SuccessWrapper'
import { updateDisplayName } from '../../lib/api'

export const ChangeDisplayName = ({ token, id, displayName }) => {
  const [value, setValue] = useState(displayName)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const handleInputChange = () => {
    if (!value.length) {
      setError('You can not set empty Display Name')
      return
    }

    setError(null)
    setMessage(null)

    try {
      updateDisplayName(token, id, value)
        .then((res) => setMessage(res.result))
        .catch((error) => {
          console.error({ error })
          setError(error.message)
        })
    } catch (err) {
      console.error({ err })

      setError(err.message)
    }
  }

  return (
    <>
      {error && (
        <ErrorWrapper header="Unable to change Display Name" error={error} />
      )}

      {message && (
        <SuccessWrapper message="Display Name changed successfully" />
      )}

      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        action={{ content: 'Change', onClick: handleInputChange }}
        fluid
      />
    </>
  )
}
