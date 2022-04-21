import Link from 'next/link';
import { Menu, Dropdown } from 'semantic-ui-react';
import { useFetchPerson } from '../lib/person';

export default function MenuComponent() {
  const { person } = useFetchPerson();

  return (
    <Menu style={{ marginTop: '10px' }}>
      <Menu.Item>
        <Link href="/">
          <a>OPTRISPACE</a>
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link href="/jobs">
          <a>Jobs</a>
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link href="/contracts">
          <a>Contracts</a>
        </Link>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>
          <Link href="/jobs/new">
            <a>Add Job</a>
          </Link>
        </Menu.Item>

        {person && (
          <Dropdown item text={`Account (${person.id})`}>
            <Dropdown.Menu>
              <Dropdown.Item icon='edit' text='Edit Profile' />
              <Dropdown.Item icon='settings' text='Settings' />
              <Dropdown.Item icon='money' text='Billing' />
              <Dropdown.Divider />
              <Dropdown.Item icon='sign-out' text='Sign Out' />
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Menu.Menu>
    </Menu>
  );
}
