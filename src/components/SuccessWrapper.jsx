import React, { useState } from 'react'
import { Message, Transition } from 'semantic-ui-react'

/**
 * @return {Message|null}
 */
export default function SuccessWrapper({ message }) {
  const [visible, setVisible] = useState(true)

  return (
    <Transition visible={visible} duration={500} unmountOnHide={true}>
      <Message
        positive
        onDismiss={() => setVisible(false)}
        content={message && <p>{message}</p>}
      />
    </Transition>
  )
}
