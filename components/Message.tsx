import React from 'react'

function Message({ msg, user }) {
  const sender = msg.sender === user?.email

  return (
    <div
      className={
        'm-1 flex w-fit  min-w-[100px] rounded-lg  border  p-3' +
        (sender ? ' self-start ' : ' self-end ') +
        (sender ? 'bg-blue-300' : 'bg-green-300')
      }
    >
      {msg.text}
    </div>
  )
}

export default Message
