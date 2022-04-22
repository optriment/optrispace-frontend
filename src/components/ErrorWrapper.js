import { Message } from 'semantic-ui-react';

export default function ErrorWrapper({ header, error }) {
  return (
    <Message negative>
      <Message.Header>{header}</Message.Header>
      {error && (
        <p>{error?.message || (error.info && error.info.message)}</p>
      )}
    </Message>
  )
}
