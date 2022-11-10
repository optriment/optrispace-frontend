import React from 'react'
import { Segment, Tab, Menu, Label, Item } from 'semantic-ui-react'
import ApplicationListItem from './ApplicationListItem'

function ApplicationsGroup(
  job,
  label,
  applications,
  key,
  blockchainViewAddressURL,
  coinSymbol
) {
  return {
    menuItem: (
      <Menu.Item key={key}>
        {label}
        <Label>{applications.length}</Label>
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane>
        <Segment basic>
          <Item.Group relaxed divided>
            {applications.map((application) => (
              <ApplicationListItem
                key={application.id}
                job={job}
                application={application}
                blockchainViewAddressURL={blockchainViewAddressURL}
                coinSymbol={coinSymbol}
              />
            ))}
          </Item.Group>
        </Segment>
      </Tab.Pane>
    ),
  }
}

export default ApplicationsGroup
