import { Header, Divider, Label, Icon } from 'semantic-ui-react'
import { formatDate } from '../../lib/formatDate'
import { isEmptyString } from '../../lib/validators'
import { FormattedDescription } from '../FormattedDescription'

export const JobCardHeader = ({
  job,
  coinSymbol,
  blockchainViewAddressURL,
}) => {
  const createdAt = formatDate(job.created_at)

  return (
    <>
      <Header as="h3">{job.customer_display_name}</Header>

      {!isEmptyString(job.customer_ethereum_address) && (
        <span>
          {' '}
          <a
            href={`${blockchainViewAddressURL}/${job.customer_ethereum_address}`}
            target="_blank"
            rel="noreferrer noopener nofollow"
            title="Open wallet information"
          >
            <Icon name="address card" /> View transactions history
          </a>
        </span>
      )}

      <Divider />

      <div style={{ wordWrap: 'break-word' }}>
        <FormattedDescription description={job.description} />
      </div>

      <Divider />

      {job.budget && job.budget > 0 && (
        <Label>
          <Icon name="money" /> {job.budget} {coinSymbol}
        </Label>
      )}

      {job.applications_count > 0 && (
        <Label>
          <Icon name="user" title="Applicants" /> {job.applications_count}
        </Label>
      )}

      <Label>
        <Icon name="clock" title="Created" /> {createdAt}
      </Label>
    </>
  )
}
