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
        All parts of this tutorial are crucial.
      </p>

      <Divider hidden />

      <Header as="h2" content="How do we work?" />

      <List ordered>
        <List.Item>
          Apply for jobs interesting to you (fill in the application form)
        </List.Item>
        <List.Item>Wait for the contract draft from the customer</List.Item>
        <List.Item>Accept contract terms for the specific work</List.Item>
        <List.Item>Do your job and send the result to the customer</List.Item>
        <List.Item>
          Receive your payment and get your BNB into your wallet after
          completing the job
        </List.Item>
      </List>

      <Divider hidden />

      <Header as="h2" content="Requirements:" />

      <p>To get started with OptriSpace you need to have:</p>

      <List ordered>
        <List.Item>
          Installed Google Chrome, Firefox, Yandex.Browser or Opera
        </List.Item>
        <List.Item>Installed MetaMask Extension</List.Item>
        <List.Item>Added Binance Smart Chain</List.Item>
        <List.Item>
          Some Binance tokens to pay for transactions (gas) fee
        </List.Item>
      </List>

      <Divider hidden />

      <Header as="h2" content="How to install MetaMask Wallet?" />

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

      <Header as="h2" content="How to add Binance Smart Chain?" />

      <List ordered>
        <List.Item>
          Open{' '}
          <a
            href="https://chainlist.org/chain/56"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            https://chainlist.org/chain/56{' '}
          </a>
          in your browser
        </List.Item>
        <List.Item>Click &quot;Connect Wallet&quot; button</List.Item>
        <List.Item>Confirm in your MetaMask</List.Item>
        <List.Item>Click &quot;Add To MetaMask&quot; button</List.Item>
        <List.Item>Confirm in your MetaMask</List.Item>
        <List.Item>
          Make sure your MetaMask has &quot;Binance Smart Chain&quot;
        </List.Item>
      </List>

      <Divider hidden />

      <Header as="h2" content="You are ready!" />
    </Container>
  )
}
