import React, { useEffect, useContext } from 'react'
import { LandingLayout } from '../../layouts/Landing'
import { ThankYouScreen } from '../../screens/thank-you/index'
import DisplayContext from '../../context/display-context'

const Page = () => {
  const { isSmallScreen, setSmallScreen } = useContext(DisplayContext)

  useEffect(() => {
    setSmallScreen(window.matchMedia('(max-width: 700px)').matches)
  }, [])

  return (
    <LandingLayout meta={{ title: 'Thank You!' }}>
      <ThankYouScreen isSmallScreen={isSmallScreen} />
    </LandingLayout>
  )
}

Page.useTwitterPixel = true

export default Page
