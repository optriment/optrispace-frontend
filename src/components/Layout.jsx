import React from 'react'
import { Container } from 'semantic-ui-react'
import Menu from './Menu'

import 'semantic-ui-css/semantic.min.css'

function Layout({ children }) {
  return (
    <Container>
      <Menu />

      {children}
    </Container>
  )
}

export default Layout
