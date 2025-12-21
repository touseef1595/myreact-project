// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8xud6bq3q5lWlYMjo0KbvbasdKxc0jDM",
  authDomain: "react-project-25.firebaseapp.com",
  projectId: "react-project-25",
  storageBucket: "react-project-25.firebasestorage.app",
  messagingSenderId: "846259806520",
  appId: "1:846259806520:web:a13cdcaa0b81fed117a1cd"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Optional: set default persistence (local = survive reloads)
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn('Could not set persistence:', err)
})

export default app