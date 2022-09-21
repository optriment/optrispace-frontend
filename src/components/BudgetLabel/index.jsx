import { Label, Icon } from 'semantic-ui-react'

export const BudgetLabel = ({ value, tokenSymbol }) => {
  if (!value || parseFloat(value) === 0) return null

  return (
    <Label>
      <Icon name="money" /> {value} {tokenSymbol}
    </Label>
  )
}
