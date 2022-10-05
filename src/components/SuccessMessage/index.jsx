import React, { useState } from 'react'
import { Message, Transition } from 'semantic-ui-react'

export const SuccessMessage = ({ header, message, duration = 500 }) => {
  const [visible, setVisible] = useState(true)

  return (
    <Transition visible={visible} duration={duration} unmountOnHide={true}>
      <Message positive onDismiss={() => setVisible(false)}>
        <Message.Header>{header}</Message.Header>
        {message && message !== '' && <p>{message}</p>}
      </Message>
    </Transition>
  )
}
