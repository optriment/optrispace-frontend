import React from 'react'
import { LandingLayout } from '../../layouts/Landing'
import { ThankYouCustomerScreen } from '../../screens/thank-you-customer/index'

const Page = () => {
  return (
    <LandingLayout meta={{ title: 'Thank You!' }}>
      <ThankYouCustomerScreen />
    </LandingLayout>
  )
}

Page.useTwitterPixel = true

export default Page
