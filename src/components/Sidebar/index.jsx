import React from 'react'
import { Label, List, Segment, Button, Header } from 'semantic-ui-react'

export const Sidebar = ({ stats }) => {
  return (
    <>
      <Segment>
        <Segment basic>
          <Header as="h2" dividing>
            Our Core Features
          </Header>

          <List bulleted size="large">
            <List.Item>No paperwork</List.Item>
            <List.Item>No middlemen</List.Item>
            <List.Item>No managers</List.Item>
            <List.Item>No third parties</List.Item>
            <List.Item>Fast & secured payments</List.Item>
            <List.Item>No fees</List.Item>
            <List.Item>Powered by Smart Contracts</List.Item>
            <List.Item>All of our code is open source</List.Item>
            <List.Item>All payments in crypto</List.Item>
            <List.Item>Born to work globally</List.Item>
          </List>
        </Segment>
      </Segment>

      <Segment>
        <Segment basic>
          <Header as="h2" dividing>
            Our Community
            <Header.Subheader>Join &amp; Follow Us</Header.Subheader>
          </Header>

          <List>
            <List.Item>
              <Button as="div" labelPosition="right">
                <Button
                  as="a"
                  color="twitter"
                  icon="twitter"
                  href="https://twitter.com/optrispace"
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                  title="Twitter"
                  content="Twitter"
                />
                <Label as="a" basic color="twitter" pointing="left">
                  8,509
                </Label>
              </Button>
            </List.Item>

            <List.Item>
              <Button as="div" labelPosition="right">
                <Button
                  as="a"
                  color="linkedin"
                  icon="linkedin"
                  href="https://www.linkedin.com/company/optriment"
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                  title="LinkedIn"
                  content="LinkedIn"
                />
                <Label as="a" basic color="linkedin" pointing="left">
                  644
                </Label>
              </Button>
            </List.Item>

            <List.Item>
              <Button as="div" labelPosition="right">
                <Button
                  as="a"
                  color="violet"
                  icon="discord"
                  href="https://discord.gg/7WEbtmuqtv"
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                  title="Discord"
                  content="Discord"
                />
                <Label as="a" basic color="discord" pointing="left">
                  42
                </Label>
              </Button>
            </List.Item>

            <List.Item>
              <Button as="div" labelPosition="right">
                <Button
                  as="a"
                  color="instagram"
                  icon="instagram"
                  href="https://www.instagram.com/optrispace/"
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                  title="Instagram"
                  content="Instagram"
                />
                <Label as="a" basic color="instagram" pointing="left">
                  11
                </Label>
              </Button>
            </List.Item>
          </List>
        </Segment>
      </Segment>

      <Segment>
        <Segment basic>
          <Header as="h2" dividing>
            Our Stats
          </Header>

          <List bulleted size="large">
            <List.Item>
              <b>Total Registrations:</b> {stats.total_registrations}
            </List.Item>
            <List.Item>
              <b>Available Tasks & Jobs:</b> {stats.opened_jobs}
            </List.Item>
            <List.Item>
              <b>Processed Transactions:</b> {stats.total_contracts}
            </List.Item>
            <List.Item>
              <b>Total Volume:</b> {stats.total_transactions_volume} BNB
            </List.Item>
          </List>
        </Segment>
      </Segment>
    </>
  )
}
