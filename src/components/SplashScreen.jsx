/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import { FiCode, FiUser, FiGithub, FiGlobe } from 'react-icons/fi'

/* ============================================
   BACKGROUND & CONTAINER
   ============================================ */

const splashContainer = css`
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #030014;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

// Corner glow effects (like Viko's design)
const glowTopRight = css`
  position: absolute;
  top: -30%;
  right: -20%;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
`

const glowBottomLeft = css`
  position: absolute;
  bottom: -30%;
  left: -20%;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
`

const glowCenter = css`
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

/* ============================================
   ICON ROW (3 circular icons)
   ============================================ */

const iconsRow = css`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
`

const iconCircle = css`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(124, 58, 237, 0.08);
  border: 1px solid rgba(124, 58, 237, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(192, 132, 252, 0.7);
  box-shadow: 0 0 25px rgba(124, 58, 237, 0.15), inset 0 0 15px rgba(124, 58, 237, 0.05);

  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
  }
`

/* ============================================
   TITLE TEXT
   ============================================ */

const titleRow = css`
  text-align: center;
  margin-bottom: 12px;
`

const titleWhite = css`
  font-family: 'Poppins', sans-serif;
  font-size: 3.2rem;
  font-weight: 800;
  color: #e2e8f0;
  letter-spacing: 0.04em;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`

const titlePurple = css`
  font-family: 'Poppins', sans-serif;
  font-size: 3.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #7c3aed, #a855f7, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.04em;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`

/* ============================================
   URL BADGE (pill-shaped typewriter)
   ============================================ */

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const urlBadge = css`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  border-radius: 50px;
  background: rgba(124, 58, 237, 0.06);
  border: 1px solid rgba(124, 58, 237, 0.2);
  margin-top: 32px;

  @media (max-width: 480px) {
    padding: 10px 20px;
  }
`

const urlText = css`
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  color: rgba(192, 132, 252, 0.8);
  letter-spacing: 0.02em;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`

const cursorBlink = css`
  color: #7c3aed;
  font-weight: 300;
  animation: ${blink} 0.8s step-end infinite;
`

/* ============================================
   COMPONENT
   ============================================ */

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  },
}

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
}

export default function SplashScreen({ finishLoading }) {
  const [isVisible, setIsVisible] = useState(true)
  const [typedUrl, setTypedUrl] = useState('')
  const fullUrl = 'mirsab-id.vercel.app'

  const stableFinishLoading = useCallback(finishLoading, [])

  // Typewriter effect for the URL
  useEffect(() => {
    let index = 0
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < fullUrl.length) {
          setTypedUrl(fullUrl.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
        }
      }, 60)
      return () => clearInterval(interval)
    }, 1200) // Start typing after icons + title appear

    return () => clearTimeout(delay)
  }, [])

  // Auto dismiss after ~3.5 seconds total
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(stableFinishLoading, 700)
    }, 3500)

    return () => clearTimeout(timer)
  }, [stableFinishLoading])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          css={splashContainer}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
        >
          {/* Background glow effects */}
          <div css={glowTopRight} />
          <div css={glowBottomLeft} />
          <motion.div
            css={glowCenter}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          />

          {/* Main content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* 3 Icon circles */}
            <motion.div css={iconsRow} variants={itemVariants}>
              <motion.div css={iconCircle} variants={iconVariants}>
                <FiCode size={22} />
              </motion.div>
              <motion.div css={iconCircle} variants={iconVariants}>
                <FiUser size={22} />
              </motion.div>
              <motion.div css={iconCircle} variants={iconVariants}>
                <FiGithub size={22} />
              </motion.div>
            </motion.div>

            {/* Title: "Welcome To My" */}
            <motion.div css={titleRow} variants={itemVariants}>
              <span css={titleWhite}>Welcome To My</span>
            </motion.div>

            {/* Title: "Portfolio Website" */}
            <motion.div css={titleRow} variants={itemVariants}>
              <span css={titlePurple}>Portfolio Website</span>
            </motion.div>

            {/* URL Badge with typewriter */}
            <motion.div variants={itemVariants}>
              <div css={urlBadge}>
                <FiGlobe size={16} color="rgba(192, 132, 252, 0.7)" />
                <span css={urlText}>
                  www.{typedUrl}
                  <span css={cursorBlink}>|</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
