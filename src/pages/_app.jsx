import React from 'react'
import Script from 'next/script'
import { AuthProvider } from '../hooks'
import Head from 'next/head'
import { Web3Provider } from '../context/web3-context'
import { DisplayProvider } from '../context/display-context'
import { GoogleAnalytics, usePageViews } from 'nextjs-google-analytics'

function MyApp({ Component, pageProps }) {
  usePageViews()

  return (
    <>
      <GoogleAnalytics />

      {Component.requiresAuth && (
        <Head>
          <script
            // If no token is found, redirect immediately
            dangerouslySetInnerHTML={{
              __html: `if(!document.cookie || document.cookie.indexOf('token') === -1)
            {location.replace(
              "/sign_in?next=" + encodeURIComponent(location.pathname + location.search)
            )}`,
            }}
          />
        </Head>
      )}

      <Script
        id="usersnap-widget1"
        strategy="afterInteractive"
        defer
        src="https://widget.usersnap.com/global/load/4d0133ee-9af8-4c58-97a3-5f4ebba13a23?onload=onUsersnapCXLoad"
      />

      <Script
        id="usersnap-widget2"
        dangerouslySetInnerHTML={{
          __html: `
            window.onUsersnapCXLoad = function(api) {
              api.init()
            }
          `,
        }}
      />

      <AuthProvider>
        <Web3Provider>
          <DisplayProvider>
            <Component {...pageProps} />
          </DisplayProvider>
        </Web3Provider>
      </AuthProvider>
    </>
  )
}

export default MyApp
