import React from 'react'
import { Message } from 'semantic-ui-react'

export default function SuccessWrapper({ message }) {
  return <Message positive>{message && <p>{message}</p>}</Message>
}
