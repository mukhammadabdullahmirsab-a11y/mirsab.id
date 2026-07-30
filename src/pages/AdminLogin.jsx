/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FiLock, FiMail, FiArrowLeft } from 'react-icons/fi'
import { motion } from 'framer-motion'

const pageStyle = css`
  min-height: 100vh;
  background: #030014;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
`

const glowBg = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 60%);
  border-radius: 50%;
  pointer-events: none;
`

const cardStyle = css`
  background: rgba(20, 20, 35, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(124, 58, 237, 0.2);
  padding: 40px;
  border-radius: 24px;
  width: 100%;
  max-width: 420px;
  z-index: 10;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
`

const titleStyle = css`
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 8px;
`

const subtitleStyle = css`
  color: #9ca3af;
  text-align: center;
  font-size: 0.95rem;
  margin-bottom: 32px;
`

const inputGroup = css`
  margin-bottom: 20px;
  position: relative;
`

const iconStyle = css`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`

const inputStyle = css`
  width: 100%;
  padding: 14px 14px 14px 44px;
  background: rgba(10, 10, 20, 0.8);
  border: 1px solid rgba(100, 100, 150, 0.2);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.2);
  }
`

const btnStyle = css`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 8px 20px rgba(124, 58, 237, 0.4);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`

const errorStyle = css`
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  margin-bottom: 20px;
  text-align: center;
`

const backBtn = css`
  position: absolute;
  top: 30px;
  left: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #9ca3af;
  background: none;
  border: none;
  font-size: 0.95rem;
  cursor: pointer;
  z-index: 10;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!auth) {
      setError("Firebase belum dikonfigurasi. Cek src/config/firebase.js")
      return
    }

    setLoading(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/admin') // Redirect to dashboard on success
    } catch (err) {
      setError('Email atau password salah.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div css={pageStyle}>
      <button css={backBtn} onClick={() => navigate('/')}>
        <FiArrowLeft /> Kembali ke Beranda
      </button>
      <div css={glowBg} />

      <motion.div 
        css={cardStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 css={titleStyle}>Admin Login</h1>
        <p css={subtitleStyle}>Silakan login untuk mengelola portofolio</p>

        {error && <div css={errorStyle}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div css={inputGroup}>
            <FiMail css={iconStyle} size={18} />
            <input
              css={inputStyle}
              type="email"
              placeholder="Email Administrator"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div css={inputGroup}>
            <FiLock css={iconStyle} size={18} />
            <input
              css={inputStyle}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button css={btnStyle} type="submit" disabled={loading}>
            {loading ? 'Memverifikasi...' : 'Masuk Dashboard'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
