import { Label, Icon } from 'semantic-ui-react'

const JobBudget = ({ budget }) => {
  if (!budget || parseInt(budget) === 0) return null

  return (
    <Label>
      <Icon name="money" /> {budget} ALZ
    </Label>
  )
}

export default JobBudget
