import React, { useEffect, useContext } from 'react'
import { LandingLayout } from '../../layouts/Landing'
import { ThankYouCustomerScreen } from '../../screens/thank-you-customer/index'
import DisplayContext from '../../context/display-context'

const Page = () => {
  const { isSmallScreen, setSmallScreen } = useContext(DisplayContext)

  useEffect(() => {
    setSmallScreen(window.matchMedia('(max-width: 700px)').matches)
  }, [])

  return (
    <LandingLayout meta={{ title: 'Thank You!' }}>
      <ThankYouCustomerScreen isSmallScreen={isSmallScreen} />
    </LandingLayout>
  )
}

export default Page
