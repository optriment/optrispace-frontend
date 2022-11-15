import React from 'react'
import { LandingLayout } from '../../layouts/Landing'
import { ThankYouScreen } from '../../screens/thank-you/index'

const Page = () => {
  return (
    <LandingLayout meta={{ title: 'Thank You!' }}>
      <ThankYouScreen />
    </LandingLayout>
  )
}

Page.useTwitterPixel = true

export default Page
