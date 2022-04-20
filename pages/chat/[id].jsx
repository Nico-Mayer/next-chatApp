import React, { useEffect, useRef } from 'react'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'
import Bottombar from '../../components/Bottombar'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { collection, query } from '@firebase/firestore'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import { db, auth } from '../../firebaseconfig'
import { doc, orderBy } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import getOtherEmail from '../../utils/getOtherEmail'
import Message from '../../components/Message'

function Chat() {
  const router = useRouter()
  const { id } = router.query
  const [user] = useAuthState(auth)
  const q = query(collection(db, `chats/${id}/messages`), orderBy('timestamp'))

  const [messages] = useCollectionData(q)
  const [chat] = useDocumentData(doc(db, `chats/${id}`))
  const bottomOfChat = useRef()

  useEffect(
    () =>
      setTimeout(
        bottomOfChat.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        }),
        100
      ),
    [messages]
  )

  return (
    <div className="flex h-screen">
      <Head>
        <title>Chat App</title>
      </Head>
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar chatPartner={getOtherEmail(chat?.users, user)} />

        <div className="no-scrollbar flex flex-1 flex-col overflow-auto p-3">
          {messages?.map((msg, index) => {
            return <Message key={index} msg={msg} user={user} />
          })}

          <div ref={bottomOfChat}></div>
        </div>

        <Bottombar id={id} user={user} />
      </div>
    </div>
  )
}

export default Chat
