import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // If firebase is not initialized (e.g. no config)
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#030014', color: '#fff' }}>
        Memeriksa autentikasi...
      </div>
    )
  }

  // Jika Firebase belum di-setup, kita redirect atau izinkan peringatan
  if (!auth) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#030014', color: '#fff', padding: 20, textAlign: 'center' }}>
        <h2>Firebase Belum Dikonfigurasi</h2>
        <p>Silakan masukkan config Firebase di <code>src/config/firebase.js</code> terlebih dahulu.</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
