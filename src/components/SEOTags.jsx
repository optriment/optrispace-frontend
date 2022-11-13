import React from 'react'
import { NextSeo } from 'next-seo'

export default function SEOTags({ pageTitle, pageDescription, pageUrl }) {
  return (
    <NextSeo
      title={pageTitle}
      description={pageDescription}
      openGraph={{
        url: pageUrl,
        title: pageTitle,
        description: pageDescription,
        type: 'website',
        locale: 'en_US',
        siteName: 'OptriSpace',
        images: [
          {
            url: `https://${pageUrl}/optrispace-logo-with-slogan.png`,
            width: 600,
            height: 300,
            alt: pageDescription,
            type: 'image/png',
          },
        ],
      }}
      twitter={{
        handle: '@optrispace',
        site: '@optrispace',
        cardType: 'summary_large_image',
      }}
    />
  )
}
