// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBwpSV_oJb8TBDl3atNhVJIva9kMYDvu34',
  authDomain: 'next-chatapp-b0a6d.firebaseapp.com',
  projectId: 'next-chatapp-b0a6d',
  storageBucket: 'next-chatapp-b0a6d.appspot.com',
  messagingSenderId: '338233406587',
  appId: '1:338233406587:web:a8266eb863d16822b11ede',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

export { auth, db }
