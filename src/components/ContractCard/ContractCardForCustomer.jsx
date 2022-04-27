import React from 'react'
import { useRouter } from 'next/router'
import { Button, Divider, Grid, Header } from 'semantic-ui-react'
import Link from 'next/link'
import { approveContract } from '../../lib/api'

import Content from './Content'
import Sidebar from './Sidebar'

export default function ContractCardForCustomer({ contract, token }) {
  const router = useRouter()

  const approve = async () => {
    const response = await approveContract(token, contract.id)

    if (response.ok) {
      router.reload()
    }
  }

  return (
    <>
      <Grid.Row>
        <Grid.Column width={8}>
          <Header floated="left" as="h1">
            Карточка контракта
          </Header>
        </Grid.Column>

        <Grid.Column width={8} textAlign="right">
          {contract.status === 'created' && (
            <Link
              href="/contracts/[id]/edit"
              as={`/contracts/${contract.id}/edit`}
              passHref
            >
              <Button
                primary
                content="Редактировать"
                size="tiny"
                labelPosition="left"
                icon="pencil"
                disabled
              />
            </Link>
          )}

          {contract.status === 'accepted' && (
            <Button
              primary
              content="Пополнить баланс"
              size="tiny"
              labelPosition="left"
              icon="bitcoin"
              disabled
            />
          )}

          {contract.status === 'sent' && (
            <>
              <Button
                primary
                content="Принять работу и закрыть контракт"
                size="tiny"
                labelPosition="left"
                icon="check"
                onClick={approve}
              />
            </>
          )}
        </Grid.Column>
      </Grid.Row>

      <Divider />

      <Grid.Row>
        <Grid.Column width={10}>
          <Content contract={contract} />
        </Grid.Column>

        <Grid.Column width={6}>
          <Sidebar contract={contract} />
        </Grid.Column>
      </Grid.Row>
    </>
  )
}
