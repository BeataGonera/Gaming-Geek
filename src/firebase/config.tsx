import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAI8mSZiAtG2gA4ws050IvZF2wuzDF623o",
    authDomain: "geeks-grouper.firebaseapp.com",
    projectId: "geeks-grouper",
    storageBucket: "geeks-grouper.appspot.com",
    messagingSenderId: "955217459850",
    appId: "1:955217459850:web:d70035e5765663f0a60b73"
  };

firebase.initializeApp(firebaseConfig)
export const timestamp = firebase.firestore.Timestamp
export const db = firebase.firestore()
export const auth = firebase.auth()