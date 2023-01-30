/*
 *                                                     __----~~~~~~~~~~~------___
 *                                    .  .   ~~//====......          __--~ ~~
 *                    -.            \_|//     |||\\  ~~~~~~::::... /~
 *                 ___-==_       _-~o~  \/    |||  \\            _/~~-
 *         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *   .~       .~       |   \\ -_    /  /-   /   ||      \   /
 *  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 *  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *           '         ~-|      /|    |-~\~~       __--~~
 *                       |-~~-_/ |    |   ~\_   _-~            /\
 *                            /  \     \__   \/~                \__
 *                        _--~ _/ | .-~~____--~-/                  ~~==.
 *                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                  -_     ~\      ~~---l__i__i__i--~~_/
 *                                  _-~-__   ~)  \--______________--~~
 *                                //.-~~~-~_--~- |-------~~~~~~~~
 *                                       //.-~~~--\
 *                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *                               神兽保佑            永无BUG
 *
 * @Author       : Seaming
 * @Date         : 2023-01-23
 * @LastEditors  : Seaming
 * @LastEditTime : 2023-01-30
 * @FilePath     : /BBlog/src/utils/firebase.js
 * @Description  : firebase使用
 *
 * Copyright (c) 2023 by Seaming 87215099+SMingC@users.noreply.github.com, All Rights Reserved.
 */

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
import { getStorage, ref, uploadBytes } from 'firebase/storage'

import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

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
const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account'
})

githubProvider.addScope('repo')

export const auth = getAuth()
export const db = getFirestore()

/**
 * UploadFile 获取一个文件并将其上传到 storageRef
 */
export const uploadFile = async png => {
  const storageRef = ref(storage, `png/${png.name}`)
  const metadata = {
    contentType: png.type
  }

  const snapshot = await uploadBytes(storageRef, png, metadata)

  console.log('uploadFile done', snapshot)
}
/**
 * 它返回一个 Promise ，解析为从 firebase 库调用 signInWithPopup 函数的结果，传入 auth 对象和 googleProvider 对象。
 */
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

/**
 * 它返回一个 Promise ，该承诺解析为从 firebase 库调用 signInWithPopup 函数的结果，传入 auth 对象和 githubProvider 对象。
 */
export const signInWithGithubPopup = () => signInWithPopup(auth, githubProvider)

/**
 * 它返回使用 auth 对象、电子邮件和密码调用 signInWithEmailAndPassword 函数的结果
 * @param email - 用户的电子邮件地址。
 * @param password - 用户的密码。
 * @returns 解析为用户对象的承诺。
 */
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

/**
 * 它使用给定的电子邮件和密码创建一个新用户
 * @param email - 要创建的用户的电子邮件地址。
 * @param password - 用户的密码。
 * @returns 解析为用户对象的承诺
 */
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

/**
 * 如果数据库中不存在用户，则使用用户的显示名称、电子邮件和创建日期创建一个新的用户文档
 * @param userAuth - 从身份验证库返回的用户对象。
 * @param [additionalInformation] - 这是一个包含您要存储在数据库中的任何附加信息的对象。
 * @returns 一个接受 userAuth 和 additionalInformation 作为参数的函数。
 */
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return

  /* 它使用 userAuth 对象的 ID 创建对用户集合中文档的引用。 */
  const userDocRef = doc(db, 'users', userAuth.uid)

  /* 它使用 userDocRef 获取用户文档的快照。 */
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    /* 它使用 userDocRef 来设置具有 displayName、email 和 createdAt 属性的用户文档。它还使用扩展运算符添加作为参数传入的任何附加信息。 */
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...additionalInformation
    })
  }
  return userDocRef
}

/**
 * 它以一个回调函数作为参数，并返回一个函数，该函数使用 onAuthStateChanged 函数的结果调用回调函数
 */
export const onAuthStateChangedListener = callback =>
  onAuthStateChanged(auth, callback)

/**
 * 它将用户从 Firebase 身份验证服务中注销
 */
export const signOutUser = async () => await signOut(auth)
