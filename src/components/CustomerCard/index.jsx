import { Item } from 'semantic-ui-react'

export const CustomerCard = ({ customer }) => {
  const randomNumber = Math.floor(Math.random() * 10000)
  const customerDisplayName =
    customer.display_name || `Anonymous${randomNumber}`

  return (
    <Item.Group>
      <Item>
        <Item.Image bordered avatar size="tiny" src="/default-userpic.jpg" />

        <Item.Content verticalAlign="middle">
          <Item.Header>{customerDisplayName}</Item.Header>
          <Item.Extra>Was online 3 days ago</Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}
