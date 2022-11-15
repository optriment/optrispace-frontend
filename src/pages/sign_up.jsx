import React from 'react'
import { LandingLayout } from '../layouts/Landing'
import { SignUpScreen } from '../screens/auth/sign-up'

const Page = () => {
  return (
    <LandingLayout meta={{ title: 'Sign Up' }}>
      <SignUpScreen />
    </LandingLayout>
  )
}

export default Page
