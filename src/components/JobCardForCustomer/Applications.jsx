import React, { useState, useEffect } from 'react'
import { Tab } from 'semantic-ui-react'
import ApplicationsGroup from './ApplicationsGroup'

const Applications = ({
  job,
  applications,
  blockchainViewAddressURL,
  tokenSymbol,
}) => {
  const [panes, setPanes] = useState(undefined)

  useEffect(() => {
    if (applications && applications.length > 0 && !panes) {
      const applicationsWithAcceptedContracts = applications.filter(
        (application) =>
          application.contract && application.contract.status !== 'created'
      )
      const applicationsWithNotAcceptedContracts = applications.filter(
        (application) =>
          application.contract && application.contract.status === 'created'
      )
      const applicationsWithoutContracts = applications.filter(
        (application) => !application.contract
      )

      setPanes([
        ApplicationsGroup(
          job,
          'New applications',
          applicationsWithoutContracts,
          'applications',
          blockchainViewAddressURL,
          tokenSymbol
        ),
        ApplicationsGroup(
          job,
          'Discussions',
          applicationsWithNotAcceptedContracts,
          'discussions',
          blockchainViewAddressURL,
          tokenSymbol
        ),
        ApplicationsGroup(
          job,
          'Contract accepted',
          applicationsWithAcceptedContracts,
          'accepted',
          blockchainViewAddressURL,
          tokenSymbol
        ),
      ])
    }
  }, [job, applications, panes, blockchainViewAddressURL, tokenSymbol])

  return <Tab panes={panes} />
}

export default Applications
