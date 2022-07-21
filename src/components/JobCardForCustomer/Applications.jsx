import React, { useState, useEffect } from 'react'
import { Tab } from 'semantic-ui-react'
import ApplicationsGroup from './ApplicationsGroup'

const Applications = ({ job, applications }) => {
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
          'applications'
        ),
        ApplicationsGroup(
          job,
          'Discussions',
          applicationsWithNotAcceptedContracts,
          'discussions'
        ),
        ApplicationsGroup(
          job,
          'Contract accepted',
          applicationsWithAcceptedContracts,
          'accepted'
        ),
      ])
    }
  }, [job, applications, panes])

  return <Tab panes={panes} />
}

export default Applications
