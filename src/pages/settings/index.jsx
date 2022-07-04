import React from 'react'
import { Header } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import { useAuth } from '../../hooks'
import ChangePassword from '../../forms/ChangePassword'

const SettingsPage = () => {
  const { token, authenticate } = useAuth()

  return (
    <>
      <Header as="h1">Settings</Header>

      <Header as="h3">Change Password</Header>

      <ChangePassword token={token} authenticate={authenticate} />
    </>
  )
}

SettingsPage.requiresAuth = true

SettingsPage.getLayout = (page) => (
  <Layout
    meta={{
      title: 'Settings | OptriSpace',
    }}
  >
    {page}
  </Layout>
)

export default SettingsPage
