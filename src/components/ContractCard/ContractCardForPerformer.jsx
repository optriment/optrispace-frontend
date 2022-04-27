import React from 'react'
import { useRouter } from 'next/router'
import { Button, Grid, Header, Divider } from 'semantic-ui-react'
import { acceptContract, sendContract } from '../../lib/api'

import Content from './Content'
import Sidebar from './Sidebar'

export default function ContractCardForPerformer({ contract, token }) {
  const router = useRouter()

  const accept = async () => {
    const response = await acceptContract(token, contract.id)

    if (response.ok) {
      router.reload()
    }
  }

  const send = async () => {
    const response = await sendContract(token, contract.id)

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
            <Button
              primary
              content="Принять условия работы"
              size="tiny"
              labelPosition="left"
              icon="check"
              onClick={accept}
            />
          )}

          {contract.status === 'accepted' && (
            <>
              <Button
                primary
                content="Отправить на проверку"
                size="tiny"
                labelPosition="left"
                icon="check"
                onClick={send}
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
