import React, { useContext } from 'react'
import { Header, Grid } from 'semantic-ui-react'
import { JobCardForApplicant } from '../../../../components/JobCardForApplicant'
import { JobCardForCustomer } from '../../../../components/JobCardForCustomer'
import { JobCardForGuest } from '../../../../components/JobCardForGuest'
import { Sidebar } from '../../../../components/Sidebar'
import Web3Context from '../../../../context/web3-context'
import { useAuth } from '../../../../hooks'
import getConfig from "next/config";

const Wrapper = ({ title, children }) => {
  return (
    <>
      <Header as="h1">{title}</Header>

      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={11}>{children}</Grid.Column>
          <Grid.Column width={5}>
            <Sidebar />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export const JobScreen = ({ job }) => {
  const { isAuthenticated, person } = useAuth()
  const { tokenSymbol } = useContext(Web3Context)
  const { publicRuntimeConfig } = getConfig()
  const testDomain = publicRuntimeConfig.domain

  if (!isAuthenticated) {
    return (
      <Wrapper title={job.title}>
        <JobCardForGuest job={job} currencyLabel={tokenSymbol} domain={testDomain} />
      </Wrapper>
    )
  }

  return (
    <Wrapper title={job.title}>
      {job.created_by === person.id ? (
        <JobCardForCustomer job={job} currencyLabel={tokenSymbol} domain={testDomain} />
      ) : (
        <JobCardForApplicant job={job} currencyLabel={tokenSymbol} domain={testDomain} />
      )}
    </Wrapper>
  )
}
