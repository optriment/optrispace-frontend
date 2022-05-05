import React, { useState } from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react'
import ClientOnly from './ClientOnly'
import { useAuth } from '../hooks'
import { useRouter } from 'next/router'
import useIsMetaMaskInstalled from '../hooks/useIsMetaMaskInstalled'

const MenuComponent = ({ setAccount, account, tokenContract }) => {
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
        <AuthDetails
          setAccount={setAccount}
          account={account}
          tokenContract={tokenContract}
        />
      </ClientOnly>
    </Menu>
  )
}

function AuthDetails({ setAccount, account, tokenContract }) {
  const { person, logout, isLoading } = useAuth()
  const router = useRouter()

  const [balance, setBalance] = useState()
  const [symbol, setSymbol] = useState()
  const isMetaMaskInstalled = useIsMetaMaskInstalled()

  // Handle connection to MetaMask
  const handleOnConnect = async () => {
    let address

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      address = ethers.utils.getAddress(accounts[0])
      setAccount(address)
    } catch (err) {
      console.error(err)

      throw err
    }

    try {
      const b = await tokenContract.balanceOf(address)
      setBalance(parseInt(b._hex))
    } catch (err) {
      console.error(err)

      throw err
    }

    try {
      const s = await tokenContract.symbol()
      setSymbol(s)
    } catch (err) {
      console.error(err)

      throw err
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
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
        <Menu.Item active={router.pathname == '/jobs/new'}>
          <Link href="/jobs/new" passHref>
            <a>Add Job</a>
          </Link>
        </Menu.Item>

        <Menu.Item>
          {account && balance !== null && symbol && (
            <b>
              Balance: {balance} {symbol}
            </b>
          )}

          {!account && isMetaMaskInstalled && (
            <Button positive onClick={handleOnConnect}>
              Connect with MetaMask
            </Button>
          )}

          {!isMetaMaskInstalled && (
            <a href="https://metamask.io/" target="_blank" rel="noreferrer">
              <b>Install MetaMask</b>
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
              onClick={() => logout({ redirectLocation: '/sign_in' })}
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
