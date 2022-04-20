import React from 'react'
import Head from 'next/head'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseconfig'

function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
  return (
    <div className="flex h-screen items-center justify-center">
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex h-64 w-64 flex-col items-center rounded-xl bg-green-500 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="100px"
          viewBox="0 0 24 24"
          width="100px"
          fill="#FFFFFF"
          className="my-10"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>

        <button
          onClick={() => signInWithGoogle('', { prompt: 'select_account' })}
          className="rounded-full bg-blue-500 px-5 py-2 font-bold text-white shadow-lg"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default Login
