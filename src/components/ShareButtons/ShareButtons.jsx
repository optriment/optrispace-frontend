import React from 'react'
import { Segment, Header, Button, Icon } from 'semantic-ui-react'
import { useRouter } from 'next/router'

export const ShareButtons = ({ domain, job }) => {
  const { asPath } = useRouter()
  const url = domain + asPath

  return (
    <Segment>
      <Header as="h3">Share Job With Friends!</Header>

      <Button
        color="facebook"
        as="a"
        target="_blank"
        rel="noreferrer noopener nofollow"
        href={'https://www.facebook.com/sharer/sharer.php?u=' + url}
      >
        <Icon name="facebook" /> Share
      </Button>

      <Button
        color="twitter"
        target="_blank"
        rel="noreferrer noopener nofollow"
        as="a"
        href={
          'https://twitter.com/intent/tweet?url=' + url + '&text=' + job.title
        }
      >
        <Icon name="twitter" /> Tweet
      </Button>

      <Button
        color="linkedin"
        target="_blank"
        rel="noreferrer noopener nofollow"
        as="a"
        href={'https://www.linkedin.com/shareArticle?mini=true&url=' + url}
      >
        <Icon name="linkedin" /> Share
      </Button>

      <Button
        color="vk"
        target="_blank"
        rel="noreferrer noopener nofollow"
        as="a"
        href={'https://vk.com/share.php?url=' + url}
      >
        <Icon name="vk" /> Share
      </Button>
    </Segment>
  )
}
