import {
  Menu,
  Label,
  Item,
} from 'semantic-ui-react';
import ApplicationListItem from './ApplicationListItem';

const ApplicationsGroup = (job, label, applications, key) => {
  return {
    menuItem: (
      <Menu.Item key={key}>
        {label}<Label>{applications.length}</Label>
      </Menu.Item>
    ),
    render: () => (
      <Item.Group relaxed>
        {applications.map(application => (
          <ApplicationListItem
            key={application.id}
            job={job}
            application={application}
          />
        ))}
      </Item.Group>
    ),
  }
}

export default ApplicationsGroup;
