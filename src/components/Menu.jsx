import React from 'react'
import Link from 'next/link'
import { Container, Dropdown, Menu } from 'semantic-ui-react'
import ClientOnly from './ClientOnly'
import { useAuth } from '../hooks'
import { useRouter } from 'next/router'

export default function MenuComponent() {
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
  const router = useRouter()

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
