import React from 'react'
import {
  Form,
  Checkbox,
  Segment,
  Divider,
  Button,
  Header,
} from 'semantic-ui-react'

const Sidebar = () => {
  return (
    <>
      <Segment>
        <Header as="h3">Join our newsletter!</Header>
        <Form>
          <Form.Field>
            <input placeholder="Your Email" required />
          </Form.Field>
          <Form.Field>
            <label>What sort of jobs are you interested in:</label>
          </Form.Field>
          <Form.Field>
            <Checkbox label="Software Development" />
          </Form.Field>
          <Form.Field>
            <Checkbox label="Design/Illustrations" />
          </Form.Field>
          <Form.Field>
            <Checkbox label="Content Management" />
          </Form.Field>
          <Form.Field>
            <Checkbox label="Copywriting" />
          </Form.Field>
          <Form.Field>
            <Checkbox label="Translations" />
          </Form.Field>
          <Form.Field>
            <Checkbox label="PM/PO" />
          </Form.Field>
          <Form.Field>
            <Checkbox label="Other" />
          </Form.Field>

          <Divider />

          <Button primary type="submit">
            Get Updates!
          </Button>
        </Form>
      </Segment>

      <Segment>
        <Header as="h3">Contact Us!</Header>

        <Button
          as="a"
          circular
          color="linkedin"
          icon="linkedin"
          href="https://www.linkedin.com/company/optrispace"
          target="_blank"
          rel="noreferrer noopener nofollow"
        />

        <Button
          as="a"
          circular
          color="twitter"
          icon="twitter"
          href="https://twitter.com/optrispace"
          target="_blank"
          rel="noreferrer noopener nofollow"
        />

        <Button
          as="a"
          circular
          color="youtube"
          icon="youtube"
          href="https://www.youtube.com/channel/UC0f2btvaHq6nB6MrIB2N5DA"
          target="_blank"
          rel="noreferrer noopener nofollow"
        />

        <Button
          as="a"
          circular
          icon="mail"
          href="mailto:office@optriment.com"
          target="_blank"
          rel="noreferrer noopener nofollow"
        />
      </Segment>
    </>
  )
}

export default Sidebar
