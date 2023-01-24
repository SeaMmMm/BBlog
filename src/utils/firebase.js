import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBkcyAQB2Foqns1qnqleta15swpWpVAw9E',
  authDomain: 'bblog-3168b.firebaseapp.com',
  projectId: 'bblog-3168b',
  storageBucket: 'bblog-3168b.appspot.com',
  messagingSenderId: '267843887237',
  appId: '1:267843887237:web:06a7f7eecf519a44df49ec',
  measurementId: 'G-8BNXDL3DFQ'
}

// Initialize Firebase
initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account'
})

githubProvider.addScope('repo')

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGithubPopup = () => signInWithPopup(auth, githubProvider)

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

export const onAuthStateChangedListener = callback =>
  onAuthStateChanged(auth, callback)

export const signOutUser = async () => await signOut(auth)
