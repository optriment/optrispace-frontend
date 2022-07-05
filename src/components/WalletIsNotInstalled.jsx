import { Message, Icon } from 'semantic-ui-react'

const WalletIsNotInstalled = () => (
  <Message error icon>
    <Icon name="warning" />
    <Message.Content>
      <Message.Header>
        We can&apos;t find installed MetaMask extension in your browser.
      </Message.Header>
      <p>
        MetaMask is used to get your wallet address. So, please{' '}
        <a
          href="https://metamask.io/"
          target="_blank"
          rel="noreferrer noopener"
        >
          install it{' '}
        </a>
        first.
      </p>
    </Message.Content>
  </Message>
)

export default WalletIsNotInstalled
