import { Button } from 'semantic-ui-react'

export const UpdateContractStatusButton = ({ icon, content, onClick }) => (
  <Button
    icon={icon ?? 'sync'}
    labelPosition="left"
    floated="right"
    primary
    content={content ?? 'Update Contract Status'}
    onClick={onClick}
  />
)
