import React from 'react'
import { List, Divider, Container, Header } from 'semantic-ui-react'

export const DashboardScreen = () => {
  return (
    <Container text>
      <Divider hidden />

      <Header as="h1" content="Getting Started" />

      <p>
        In this tutorial you will learn how to get started on OptriSpace.
        <br />
        All parts of this tutorial are crucial important.
      </p>

      <Divider hidden />

      <Header as="h2" content="How we work in alpha version" />

      <List ordered>
        <List.Item>
          Apply to jobs interesting for you (fill in the application form)
        </List.Item>
        <List.Item>
          Wait for the contract&apos;s draft from the customer
        </List.Item>
        <List.Item>
          Accept contract&apos;s conditions for the specific work
        </List.Item>
        <List.Item>Do your job and send result to the customer</List.Item>
        <List.Item>
          All payments will be processed via Binance Testnet
        </List.Item>
        <List.Item>
          Real BNB will send to your wallet after job&apos;s completion
        </List.Item>
      </List>

      <Divider hidden />

      <Header as="h2" content="Requirements" />

      <p>To get started with OptriSpace you need to have:</p>

      <List ordered>
        <List.Item>
          Installed Google Chrome, Firefox, Yandex.Browser or Opera
        </List.Item>
        <List.Item>Installed MetaMask Extension</List.Item>
        <List.Item>Added Binance Smart Chain Testnet</List.Item>
        <List.Item>
          Some Binance&apos;s test tokens to pay for transactions (gas) fee
        </List.Item>
      </List>

      <Divider hidden />

      <Header as="h2" content="How to install MetaMask Wallet" />

      <p>MetaMask is a crypto wallet & gateway to blockchain apps.</p>

      <List ordered>
        <List.Item>
          Open{' '}
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            https://metamask.io{' '}
          </a>
          in your browser
        </List.Item>
        <List.Item>Follow the instructions on MetaMask website</List.Item>
        <List.Item>Install the MetaMask Wallet to your browser</List.Item>
      </List>

      <Divider hidden />

      <Header as="h2" content="How to add Binance Smart Chain Testnet" />

      <p>
        In alpha and beta we use Testnet to get rid of payments with real money
        for the transactions.
      </p>

      <List ordered>
        <List.Item>
          Open{' '}
          <a
            href="https://chainlist.org/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            https://chainlist.org{' '}
          </a>
          in your browser
        </List.Item>
        <List.Item>Toggle &quot;Testnets&quot; checkbox on top menu</List.Item>
        <List.Item>Type &quot;bnb&quot; in the search field</List.Item>
        <List.Item>
          Find &quot;Binance Smart Chain&quot; with ChainId 97
        </List.Item>
        <List.Item>Click &quot;Connect Wallet&quot; button</List.Item>
        <List.Item>Confirm in your MetaMask</List.Item>
        <List.Item>Click &quot;Add To MetaMask&quot; button</List.Item>
        <List.Item>Confirm in your MetaMask</List.Item>
        <List.Item>
          Make sure your MetaMask has &quot;Binance Smart Chain Testnet&quot;
        </List.Item>
        <List.Item>
          If it does not, activate test networks in MetaMask
        </List.Item>
      </List>

      <Divider hidden />

      <Header
        as="h2"
        content="How to get test BNB Tokens from Binance Faucet"
      />

      <p>Test tokens used to pay for gas fees (transactions).</p>

      <List ordered>
        <List.Item>
          Open{' '}
          <a
            href="https://testnet.binance.org/faucet-smart"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            https://testnet.binance.org/faucet-smart{' '}
          </a>
          in your browser
        </List.Item>
        <List.Item>Pass the Captcha</List.Item>
        <List.Item>
          Paste your wallet address from MetaMask in the text field
        </List.Item>
        <List.Item>Click &quot;Give me BNB&quot;</List.Item>
        <List.Item>
          Wait a bit and check you&apos;ve received 0.5 test tokens to your
          MetaMask
        </List.Item>
      </List>

      <Divider hidden />

      <Header as="h2" content="Congratulations!" />
    </Container>
  )
}
