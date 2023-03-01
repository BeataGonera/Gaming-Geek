import {initializeApp} from 'firebase/app'
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getDatabase } from "firebase/database"
import { getMessaging } from 'firebase/messaging'


const firebaseConfig = {
    apiKey: "AIzaSyAI8mSZiAtG2gA4ws050IvZF2wuzDF623o",
    authDomain: "geeks-grouper.firebaseapp.com",
    projectId: "geeks-grouper",
    storageBucket: "geeks-grouper.appspot.com",
    messagingSenderId: "955217459850",
    appId: "1:955217459850:web:d70035e5765663f0a60b73",
    databaseURL: "https://geeks-grouper-default-rtdb.firebaseio.com/"

  };

export const app = initializeApp(firebaseConfig)
// export const timestamp = firebase.firestore.Timestamp
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const rtDatabase = getDatabase(app)
export const messaging = getMessaging(app)