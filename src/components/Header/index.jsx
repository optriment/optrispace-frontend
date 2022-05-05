import React from 'react'
import { Divider } from 'semantic-ui-react'
import Menu from '../Menu'

const Header = ({ setAccount, account, tokenContract }) => {
  return (
    <>
      <Menu
        setAccount={setAccount}
        account={account}
        tokenContract={tokenContract}
      />

      <Divider horizontal>Header</Divider>
    </>
  )
}

export default Header
