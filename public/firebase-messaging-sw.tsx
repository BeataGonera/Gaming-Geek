import { initializeApp } from "firebase/app"
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";


// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyAI8mSZiAtG2gA4ws050IvZF2wuzDF623o",
    authDomain: "geeks-grouper.firebaseapp.com",
    databaseURL: "https://geeks-grouper-default-rtdb.firebaseio.com",
    projectId: "geeks-grouper",
    storageBucket: "geeks-grouper.appspot.com",
    messagingSenderId: "955217459850",
    appId: "1:955217459850:web:d70035e5765663f0a60b73"
};

initializeApp(firebaseConfig)
const messaging = getMessaging();
onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'moja notyfikacja',
      icon: '/dice.webp'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
