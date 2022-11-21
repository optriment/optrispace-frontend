import { Divider, Icon, Message } from 'semantic-ui-react'

export const WalletIsNotInstalled = () => (
  <Message negative icon>
    <Icon name="warning sign" />

    <Message.Content>
      <Message.Header>
        We are happy to process transaction on blockchain, but...
      </Message.Header>

      <Divider />

      <p>
        Unfortunately we can&apos;t do this without installed MetaMask wallet in
        your browser.
        <br />
        Why do we need that? Because all transactions on blockchain should be
        signed by a user.
      </p>

      <p>
        Make sure
        <a
          href="https://metamask.io/"
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          {' MetaMask wallet '}
        </a>
        is installed and activated in your browser.
      </p>

      <p>
        <b>
          If you still have problems and can&apos;t continue, please
          <a href="mailto:office@optriment.com">{' contact us'}</a>.
        </b>
      </p>
    </Message.Content>
  </Message>
)
