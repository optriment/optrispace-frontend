import React from 'react'
import Menu from '../Menu'

const Header = ({ setAccount, account, tokenContract }) => {
  return (
    <Menu
      setAccount={setAccount}
      account={account}
      tokenContract={tokenContract}
    />
  )
}

export default Header
