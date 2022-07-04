import { Item } from 'semantic-ui-react'

export default function CustomerCard({ customer }) {
  return (
    <Item.Group divided>
      <Item>
        <Item.Image
          bordered
          avatar
          size="tiny"
          src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
        />

        <Item.Content verticalAlign="middle">
          <Item.Header>{customer.display_name}</Item.Header>
          <Item.Extra>Was online 3 days ago</Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}
