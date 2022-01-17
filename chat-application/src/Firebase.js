import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyChwHQOXjYFZnu3UdLWiFopYZon4u-rV8M",
    authDomain: "chat-application-c1b21.firebaseapp.com",
    projectId: "chat-application-c1b21",
    storageBucket: "chat-application-c1b21.appspot.com",
    messagingSenderId: "1090729622328",
    appId: "1:1090729622328:web:56660ec092f83555ca1fcd",
    measurementId: "G-SFWZYBQ96Z"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebase.firestore()
  export default db