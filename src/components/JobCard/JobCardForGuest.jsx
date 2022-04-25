import React from 'react'
import { Button, Grid, Divider, Header } from 'semantic-ui-react'

export default function JobCardForGuest({
  renderHeader,
  renderDescription,
  renderStats,
}) {
  return (
    <>
      {renderHeader}

      {renderDescription}

      {renderStats}

      <Grid.Row>
        <Grid.Column>
          <Header as="h2" style={{ fontSize: '1.5em' }}>
            Оставить заявку ко проекту
          </Header>

          <p>
            Для отправки заявки на выполнение работы у вас должна быть
            подтверждённая учётная запись на{' '}
            <a href="https://binance.com/">Binance</a>.
          </p>
          <p>
            Нажмите на кнопку ниже, чтобы выполнить вход в систему OPTRISPACE
            через Binance и оставить заявку ко проекту.
          </p>

          <Divider />

          <Button
            content="Войти через Binance"
            labelPosition="left"
            icon="sign-in"
            color="green"
          />
        </Grid.Column>
      </Grid.Row>
    </>
  )
}
