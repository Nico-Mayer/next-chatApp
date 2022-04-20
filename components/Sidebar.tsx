import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import { signOut } from 'firebase/auth'
import { auth } from '../firebaseconfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, addDoc } from '@firebase/firestore'
import { db } from '../firebaseconfig'
import getOtherEmail from '../utils/getOtherEmail'

function Sidebar() {
  const [user] = useAuthState(auth)
  const [snapshot, loading, error] = useCollection(collection(db, 'chats'))
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  const [photoURL, setPhotoURL] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  )
  const chatExists = (email) => {
    var test = chats?.find(
      (chat) => chat.users.includes(user?.email) && chat.users.includes(email)
    )
    if (test) {
      return true
    } else {
      return false
    }
  }

  const newChat = async () => {
    const input = prompt('Enter email of chat partner')
    if (!chatExists(input) && input !== user.email && input !== '') {
      await addDoc(collection(db, 'chats'), { users: [user?.email, input] })
    }
  }

  useState(() => {})

  useEffect(() => {
    if (user && user.photoURL) {
      setPhotoURL(user.photoURL)
    }
  }, [user])

  return (
    <div className="flex h-full w-80 flex-col overflow-hidden border-r border-gray-200">
      <div className="flex h-20 w-full items-center justify-between border-b border-gray-200 p-2">
        <div className="item-center flex align-middle">
          <img className="w-12 rounded-full" src={photoURL} alt="" />

          <span className="m-auto p-2">{user?.displayName}</span>
        </div>

        <button
          className="rounded-full bg-red-200 px-4 py-2"
          onClick={() => signOut(auth)}
        >
          Logout
        </button>
      </div>

      <div className="flex justify-center">
        <button
          className=" my-3 w-64 rounded-full bg-blue-200 py-2"
          onClick={() => {
            newChat()
          }}
        >
          New Chat
        </button>
      </div>

      <div className="no-scrollbar flex w-full flex-1 flex-col overflow-x-auto">
        {chats
          ?.filter((chat) => chat.users.includes(user?.email))
          .map((chat) => {
            return (
              <Chat
                key={chat.id}
                id={chat.id}
                chatPartner={getOtherEmail(chat.users, user)}
              />
            )
          })}
      </div>
    </div>
  )
}

export default Sidebar
