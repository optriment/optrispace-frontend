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
        id="chatwoot-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.chatwootSettings = {"position":"right","type":"standard","launcherTitle":"Chat with us"};
            (function(d,t) {
              var BASE_URL="https://app.chatwoot.com";
              var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
              g.src=BASE_URL+"/packs/js/sdk.js";
              g.defer = true;
              g.async = true;
              s.parentNode.insertBefore(g,s);
              g.onload=function(){
                window.chatwootSDK.run({
                  websiteToken: 'Zc4rg3cr8GSbRAywQCcxiJZt',
                  baseUrl: BASE_URL
                })
              }
            })(document,"script");
          `,
        }}
      />

      {Component.useTwitterPixel && (
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
                },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
                a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
                // Insert Twitter Pixel ID and Standard Event data below
                twq('init','o9ge6');
                twq('track','PageView');
              `,
            }}
          />
        </Head>
      )}

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
