import React from 'react'
import { Divider, Message, Icon } from 'semantic-ui-react'

export const NotEnoughMoney = ({ coinSymbol }) => (
  <Message warning icon>
    <Icon name="warning sign" />

    <Message.Content>
      <Message.Header>Not enough money to process transaction</Message.Header>

      <Divider />

      <p>
        Your balance is 0 {coinSymbol}.
        <br />
        It is not enough to pay for gas fee.
      </p>
    </Message.Content>
  </Message>
)
