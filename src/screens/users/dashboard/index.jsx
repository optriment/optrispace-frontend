import React from 'react'
import { Container, Header } from 'semantic-ui-react'

export const DashboardScreen = ({ isSmallScreen }) => {
  return (
    <Container textAlign="center" fluid>
      <Header
        as="h1"
        content="Dashboard"
        style={{
          fontSize: isSmallScreen ? '2.5em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: isSmallScreen ? null : '0.7em',
        }}
      />
    </Container>
  )
}
