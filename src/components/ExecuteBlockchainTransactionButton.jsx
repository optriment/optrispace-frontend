import { Button } from 'semantic-ui-react'

export const ExecuteBlockchainTransactionButton = ({ content, onClick }) => (
  <Button
    icon="play"
    labelPosition="left"
    floated="right"
    color="orange"
    content={content}
    onClick={onClick}
  />
)
