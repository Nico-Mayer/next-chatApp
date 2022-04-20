import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { db } from '../firebaseconfig'

function Bottombar({ id, user }) {
  const [input, setInput] = useState('')
  const sendMessage = async (e) => {
    e.preventDefault()
    if (input !== '') {
      await addDoc(collection(db, `chats/${id}/messages`), {
        text: input,
        sender: user.email,
        timestamp: serverTimestamp(),
      })
      setInput('')
    }
  }

  return (
    <form className="p-3">
      <input
        className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-3 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
        placeholder="Type a message..."
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <button type="submit" className="" hidden onClick={sendMessage}></button>
    </form>
  )
}

export default Bottombar
