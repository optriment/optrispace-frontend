import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Loader, Icon, Button, Dropdown, Menu } from 'semantic-ui-react'
import { useAuth } from '../hooks'
import { useRouter } from 'next/router'
import Web3Context from '../context/web3-context'
import Logo from '../../public/optrispace.svg'

const MenuComponent = () => {
  const router = useRouter()

  return (
    <Menu stackable secondary style={{ marginTop: '1em' }}>
      <Menu.Item>
        <Link href="/" passHref>
          <a>
            <Image src={Logo} alt="OptriSpace" width="100" height="42" />
          </a>
        </Link>
      </Menu.Item>

      <Menu.Item link active={router.pathname == '/jobs'}>
        <Link href="/jobs">
          <a>Jobs</a>
        </Link>
      </Menu.Item>

      <AuthDetails />
    </Menu>
  )
}

function AuthDetails() {
  const { person, logout, isLoading } = useAuth()
  const {
    isWalletInstalled,
    isCorrectNetwork,
    isWalletConnected,
    currentAccount,
    connectWallet,
    accountBalance,
    accountBalanceLoading,
    coinSymbol,
    blockchainNetworkName,
  } = useContext(Web3Context)
  const router = useRouter()

  if (isLoading) {
    return (
      <Menu.Item>
        <Loader size="small" active inline />
      </Menu.Item>
    )
  }

  if (!person) {
    return (
      <>
        <Menu.Menu position="right">
          <Menu.Item link active={router.pathname == '/sign_up'}>
            <Link href="/sign_up" passHref>
              <a>Sign Up</a>
            </Link>
          </Menu.Item>

          <Menu.Item link active={router.pathname == '/sign_in'}>
            <Link href="/sign_in" passHref>
              <a>Log In</a>
            </Link>
          </Menu.Item>
        </Menu.Menu>
      </>
    )
  }

  return (
    <>
      <Menu.Item link active={router.pathname == '/applications'}>
        <Link href="/applications" passHref>
          <a>Applications</a>
        </Link>
      </Menu.Item>

      <Menu.Item link active={router.pathname == '/contracts'}>
        <Link href="/contracts" passHref>
          <a>Contracts</a>
        </Link>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>
          {isWalletInstalled ? (
            <>
              {isWalletConnected ? (
                <>
                  {isCorrectNetwork ? (
                    <>
                      {currentAccount === '' ? (
                        <>
                          <Icon
                            name="warning sign"
                            size="large"
                            color="orange"
                            title="Unable to get your wallet address"
                          />
                          Wrong wallet address
                        </>
                      ) : (
                        <>
                          {accountBalanceLoading ? (
                            <Loader size="small" active inline />
                          ) : (
                            <b>
                              Balance: {accountBalance} {coinSymbol}
                            </b>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Icon
                        name="warning sign"
                        size="large"
                        color="red"
                        title={`Please connect your wallet to ${blockchainNetworkName}`}
                      />
                      Wrong network selected
                    </>
                  )}
                </>
              ) : (
                <Button color="orange" inverted onClick={connectWallet}>
                  Connect Wallet
                </Button>
              )}
            </>
          ) : (
            <Button
              as="a"
              href="https://metamask.io/"
              target="_blank"
              rel="noreferrer noopener"
              color="orange"
            >
              Please Install MetaMask
            </Button>
          )}
        </Menu.Item>

        <Dropdown item text="Account">
          <Dropdown.Menu>
            <Link href="/settings" passHref>
              <Dropdown.Item icon="settings" text="Settings" />
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => logout()}
              icon="sign-out"
              text="Sign Out"
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </>
  )
}

export default MenuComponent
