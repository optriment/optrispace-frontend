import { Item } from 'semantic-ui-react'

export default function CustomerCard() {
  const randomNumber = Math.floor(Math.random() * 10000)

  return (
    <Item.Group divided>
      <Item>
        <Item.Image bordered avatar size="tiny" src="/default-userpic.jpg" />

        <Item.Content verticalAlign="middle">
          <Item.Header>Anonymous{randomNumber}</Item.Header>
          <Item.Extra>Was online 3 days ago</Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}
