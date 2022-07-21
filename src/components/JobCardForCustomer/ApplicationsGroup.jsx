import React from 'react'
import { Tab, Menu, Label, Item } from 'semantic-ui-react'
import ApplicationListItem from './ApplicationListItem'

function ApplicationsGroup(job, label, applications, key) {
  return {
    menuItem: (
      <Menu.Item key={key}>
        {label}
        <Label>{applications.length}</Label>
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane>
        <Item.Group relaxed>
          {applications.map((application) => (
            <ApplicationListItem
              key={application.id}
              job={job}
              application={application}
            />
          ))}
        </Item.Group>
      </Tab.Pane>
    ),
  }
}

export default ApplicationsGroup
