import React from 'react'
import { Divider, Message, Icon } from 'semantic-ui-react'

export const WrongAccount = ({
  currentAccount,
  walletAddressToCompareWith,
}) => (
  <Message warning icon>
    <Icon name="warning sign" />

    <Message.Content>
      <Message.Header>You have connected with wrong account!</Message.Header>

      <Divider />

      <p>
        We found another account associated with your profile on OptriSpace:
        <br />
        {walletAddressToCompareWith}.
      </p>

      <p>
        But currently you connected as:
        <br />
        {currentAccount}.
      </p>

      <p>
        Please switch to a valid account in MetaMask and then reload the page.
      </p>
    </Message.Content>
  </Message>
)
