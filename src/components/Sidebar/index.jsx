import React from 'react'
import { Segment, Button, Header } from 'semantic-ui-react'
import { SidebarRegistrationForm } from '../../forms/Marketing/SidebarRegistrationForm'

export const Sidebar = () => {
  return (
    <>
      <Segment>
        <Header as="h3">Join our newsletter!</Header>

        <p>
          Want to be notified when new jobs and tasks come out? Simply drop your
          email in the form below.
        </p>

        <p>We will not spam you. Unsubscribe at any time.</p>

        <SidebarRegistrationForm />
      </Segment>

      <Segment>
        <Header as="h3">Contact Us!</Header>

        <Button
          as="a"
          circular
          color="linkedin"
          icon="linkedin"
          href="https://www.linkedin.com/company/optriment"
          target="_blank"
          rel="noreferrer noopener nofollow"
          title="LinkedIn"
        />

        <Button
          as="a"
          circular
          color="twitter"
          icon="twitter"
          href="https://twitter.com/optrispace"
          target="_blank"
          rel="noreferrer noopener nofollow"
          title="Twitter"
        />

        <Button
          as="a"
          circular
          color="instagram"
          icon="instagram"
          href="https://www.instagram.com/optrispace/"
          target="_blank"
          rel="noreferrer noopener nofollow"
          title="Instagram"
        />

        <Button
          as="a"
          circular
          color="youtube"
          icon="youtube"
          href="https://www.youtube.com/channel/UC0f2btvaHq6nB6MrIB2N5DA"
          target="_blank"
          rel="noreferrer noopener nofollow"
          title="YouTube"
        />

        <Button
          as="a"
          circular
          color="violet"
          icon="discord"
          href="https://discord.gg/7WEbtmuqtv"
          target="_blank"
          rel="noreferrer noopener nofollow"
          title="Discord"
        />

        <Button
          as="a"
          circular
          icon="mail"
          href="mailto:office@optriment.com"
          target="_blank"
          rel="noreferrer noopener nofollow"
          title="Email"
        />
      </Segment>
    </>
  )
}
