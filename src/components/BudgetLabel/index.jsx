import { Label, Icon } from 'semantic-ui-react'

export const BudgetLabel = ({ value, currencyLabel }) => {
  if (!value || parseFloat(value) === 0) return null

  return (
    <Label>
      <Icon name="money" /> {value} {currencyLabel}
    </Label>
  )
}
