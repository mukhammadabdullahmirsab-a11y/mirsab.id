import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Ganti nilai di bawah ini dengan Firebase Config Anda sendiri
// Anda bisa mendapatkannya di Firebase Console -> Project Settings -> General
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}

// Initialize Firebase (hanya jika config sudah diisi)
let app, auth, db

try {
  // Cek apakah config masih placeholder
  if (firebaseConfig.apiKey !== "YOUR_API_KEY_HERE") {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
  }
} catch (error) {
  console.error("Firebase initialization error:", error)
}

export { auth, db }
