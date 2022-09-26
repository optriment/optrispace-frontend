import React from 'react'
import { Chat } from '../../../../components/Chat'
import { ProfileIsNotConfigured } from '../../../../components/ProfileIsNotConfigured'
import { isEmptyString } from '../../../../lib/validators'

export const ChatScreen = ({ chat, person, token }) => {
  if (isEmptyString(person.ethereum_address)) {
    return <ProfileIsNotConfigured />
  }

  const topicRegex = /^urn:(\w+):(.*)$/

  let topicType = ''
  let title = chat.topic

  const pp = topicRegex.exec(chat?.topic)

  if (pp) {
    topicType = pp[1]
    title = `Chat about ${topicType}`
  }

  return (
    <>
      <Chat title={title} chatId={chat.id} token={token} />
    </>
  )
}
