import { Icon, List, Item } from 'semantic-ui-react'
import { formatDateTime } from '../../lib/formatDate'
import { isEmptyString } from '../../lib/validators'

export const JobCardHeader = ({
  job,
  coinSymbol,
  blockchainViewAddressURL,
}) => {
  const createdAt = formatDateTime(job.created_at)
  const updatedAt = formatDateTime(job.updated_at)

  return (
    <Item.Group>
      <Item>
        <Item.Image size="tiny" src="/default-userpic-128x128.png" />

        <Item.Content>
          <Item.Header>
            {job.customer_display_name}

            {!isEmptyString(job.customer_ethereum_address) && (
              <>
                {' '}
                <a
                  href={`${blockchainViewAddressURL}/${job.customer_ethereum_address}`}
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                  title="Open wallet information"
                >
                  <Icon name="address card" />
                </a>
              </>
            )}
          </Item.Header>

          <Item.Meta>
            <List bulleted horizontal>
              {job.budget > 0 && (
                <List.Item>
                  Budget: {job.budget} {coinSymbol}
                </List.Item>
              )}
              <List.Item>{job.applications_count} Applicants</List.Item>
            </List>
          </Item.Meta>
          <Item.Extra>
            <List bulleted horizontal>
              <List.Item>Created: {createdAt}</List.Item>
              {updatedAt > createdAt && (
                <List.Item>Updated: {updatedAt}</List.Item>
              )}
            </List>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}
