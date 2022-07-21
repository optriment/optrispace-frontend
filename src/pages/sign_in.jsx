import React, { useEffect, useContext } from 'react'
import { LandingLayout } from '../layouts/Landing'
import { SignInScreen } from '../screens/auth/sign-in'
import DisplayContext from '../context/display-context'

const Page = () => {
  const { setSmallScreen } = useContext(DisplayContext)

  useEffect(() => {
    setSmallScreen(window.matchMedia('(max-width: 700px)').matches)
  }, [])

  return (
    <LandingLayout meta={{ title: 'Sign In' }}>
      <SignInScreen />
    </LandingLayout>
  )
}

export default Page
