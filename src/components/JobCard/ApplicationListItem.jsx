import React from 'react'
import { Button, Label, Item } from 'semantic-ui-react'
import Link from 'next/link'

export default function ApplicationListItem({ job, application }) {
  const { applicant, contract } = application

  return (
    <Item>
      <Item.Image
        size="tiny"
        src="https://react.semantic-ui.com/images/wireframe/image.png"
      />

      <Item.Content>
        <Item.Header>{applicant.id}</Item.Header>
        <Item.Meta>
          <span>
            0 завершённых проектов, 0.0 рейтинг, 0% заказчиков рекомендуют
          </span>
        </Item.Meta>
        <Item.Description>{application.comment}</Item.Description>
        <Item.Extra>
          <Button size="tiny" floated="right">
            Чат
          </Button>

          {contract ? (
            <Link
              href="/contracts/[id]"
              as={`/contracts/${contract.id}`}
              passHref
            >
              <Button primary size="tiny" floated="right">
                Перейти в контракт
              </Button>
            </Link>
          ) : (
            <Link
              href={{
                pathname: `/jobs/${job.id}/contracts/new`,
                query: { application_id: application.id },
              }}
              passHref
            >
              <Button color="green" size="tiny" floated="right">
                Предложить контракт
              </Button>
            </Link>
          )}

          {application.price && (
            <Label>Готов выполнить за: {application.price} COIN</Label>
          )}
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}
