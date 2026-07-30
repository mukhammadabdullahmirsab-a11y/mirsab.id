import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Ganti nilai di bawah ini dengan Firebase Config Anda sendiri
// Anda bisa mendapatkannya di Firebase Console -> Project Settings -> General
const firebaseConfig = {
  apiKey: "AIzaSyAerq_1fYKGezIrEbYEKULFEuzvCt31u5o",
  authDomain: "mirsab22-fe063.firebaseapp.com",
  projectId: "mirsab22-fe063",
  storageBucket: "mirsab22-fe063.firebasestorage.app",
  messagingSenderId: "147212216830",
  appId: "1:147212216830:web:75302820b4393d4e2c78af",
  measurementId: "G-0RHZV8L6H5"
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
