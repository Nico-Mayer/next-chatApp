import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div className="flex h-screen">
      <Head>
        <title>ChatApp</title>
      </Head>
      <Sidebar />
    </div>
  )
}

export default Home
