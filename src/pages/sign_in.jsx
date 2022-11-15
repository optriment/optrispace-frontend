import React from 'react'
import { LandingLayout } from '../layouts/Landing'
import { SignInScreen } from '../screens/auth/sign-in'

const Page = () => {
  return (
    <LandingLayout meta={{ title: 'Sign In' }}>
      <SignInScreen />
    </LandingLayout>
  )
}

export default Page
