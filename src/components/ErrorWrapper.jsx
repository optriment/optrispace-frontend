import React from 'react'
import { Message } from 'semantic-ui-react'

export default function ErrorWrapper({ header, error }) {
  return (
    <Message negative>
      <Message.Header>{header}</Message.Header>
      {error && <p>{error.info?.message || error}</p>}
    </Message>
  )
}
