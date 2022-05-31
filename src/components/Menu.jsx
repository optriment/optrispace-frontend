import React, { useContext } from 'react'
import Link from 'next/link'
import { Loader, Button, Container, Dropdown, Menu } from 'semantic-ui-react'
import ClientOnly from './ClientOnly'
import { useAuth } from '../hooks'
import { useRouter } from 'next/router'
import Web3Context from '../context/web3-context'

const MenuComponent = () => {
  const router = useRouter()

  return (
    <Menu style={{ marginTop: '10px' }}>
      <Menu.Item active={router.pathname == '/'}>
        <Link href="/">
          <a>OPTRISPACE</a>
        </Link>
      </Menu.Item>

      <Menu.Item active={router.pathname == '/jobs'}>
        <Link href="/jobs">
          <a>Jobs</a>
        </Link>
      </Menu.Item>

      <ClientOnly>
        <AuthDetails />
      </ClientOnly>
    </Menu>
  )
}

function AuthDetails() {
  const { person, logout, isLoading } = useAuth()
  const {
    isWalletInstalled,
    currentAccount,
    connectWallet,
    accountBalance,
    accountBalanceLoading,
    tokenSymbol,
  } = useContext(Web3Context)
  const router = useRouter()

  if (isLoading) {
    return <Loader size="tiny" active inline />
  }

  if (!person) {
    return (
      <Container>
        <Menu.Menu position="right">
          <Menu.Item active={router.pathname == '/sign_up'}>
            <Link href="/sign_up" passHref>
              <a>Sign Up</a>
            </Link>
          </Menu.Item>

          <Menu.Item active={router.pathname == '/sign_in'}>
            <Link href="/sign_in" passHref>
              <a>Log In</a>
            </Link>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    )
  }

  return (
    <Container>
      <Menu.Item active={router.pathname == '/applications'}>
        <Link href="/applications" passHref>
          <a>Applications</a>
        </Link>
      </Menu.Item>

      <Menu.Item active={router.pathname == '/contracts'}>
        <Link href="/contracts" passHref>
          <a>Contracts</a>
        </Link>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>
          {isWalletInstalled ? (
            <>
              {currentAccount === '' ? (
                <Button onClick={connectWallet}>Connect wallet</Button>
              ) : (
                <>
                  {accountBalanceLoading ? (
                    <Loader size="tiny" active inline />
                  ) : (
                    <b>
                      Balance: {accountBalance} {tokenSymbol}
                    </b>
                  )}
                </>
              )}
            </>
          ) : (
            <a href="https://metamask.io/" target="_blank" rel="noreferrer">
              Install Wallet
            </a>
          )}
        </Menu.Item>

        <Dropdown item text="Account">
          <Dropdown.Menu>
            <Dropdown.Item icon="edit" text="Edit Profile" />
            <Dropdown.Item icon="settings" text="Settings" />
            <Dropdown.Item icon="money" text="Billing" />
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => logout()}
              icon="sign-out"
              text="Sign Out"
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Container>
  )
}

export default MenuComponent
