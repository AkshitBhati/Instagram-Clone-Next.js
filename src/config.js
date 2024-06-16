// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAu-U83WEZOG16oEje32g5IBt1c2Yc4KfA",
  authDomain: "insta-next-v2-c5d04.firebaseapp.com",
  projectId: "insta-next-v2-c5d04",
  storageBucket: "insta-next-v2-c5d04.appspot.com",
  messagingSenderId: "135267900490",
  appId: "1:135267900490:web:979b8652e3974fd3015ab3",
  measurementId: "G-N6C73XVCQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export { app, db, storage }
