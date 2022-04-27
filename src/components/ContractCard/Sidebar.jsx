import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import { formatDateTime } from '../../lib/formatDate'

export default function Sidebar({ contract }) {
  return (
    <Segment.Group>
      <Segment padded>
        <Header as="h3">Текущий статус</Header>

        {contract.status}
      </Segment>

      <Segment padded>
        <Header as="h3">Стоимость работ</Header>

        {contract.price}
      </Segment>

      {contract.duration && (
        <Segment padded>
          <Header as="h3">Длительность (в днях)</Header>

          {contract.duration}
        </Segment>
      )}

      <Segment padded>
        <Header as="h3">Заказчик (ID)</Header>

        {contract.customer.id}
      </Segment>

      <Segment padded>
        <Header as="h3">Исполнитель (ID)</Header>

        {contract.performer.id}
      </Segment>

      <Segment padded>
        <Header as="h3">Дата последнего изменения</Header>

        {formatDateTime(contract.updated_at)}
      </Segment>
    </Segment.Group>
  )
}
