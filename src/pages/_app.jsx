import React, { useState } from 'react'
import { AuthProvider } from '../hooks'
import Head from 'next/head'
import abi from '../../contracts/token.json'
import getConfig from 'next/config'
import useTokenContract from '../hooks/useTokenContract'

function MyApp({ Component, pageProps }) {
  const { publicRuntimeConfig } = getConfig()
  const getLayout = Component.getLayout ?? ((page) => page)

  const contractAddress = publicRuntimeConfig.token_contract_address
  const [account, setAccount] = useState()
  const tokenContract = useTokenContract(contractAddress, abi, account)

  return (
    <>
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

      <AuthProvider>
        {getLayout(
          <Component
            {...pageProps}
            setAccount={setAccount}
            account={account}
            tokenContract={tokenContract}
          />
        )}
      </AuthProvider>
    </>
  )
}

export default MyApp
