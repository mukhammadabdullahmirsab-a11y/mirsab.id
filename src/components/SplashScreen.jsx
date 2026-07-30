/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const splashContainer = css`
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #0a0a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const backgroundGlow = css`
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(10,10,26,0) 70%);
  border-radius: 50%;
  pointer-events: none;
`

const logoContainer = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`

const bracketStyle = css`
  font-family: monospace;
  font-size: 4rem;
  font-weight: 800;
  color: #7c3aed;
  opacity: 0.8;
`

const nameStyle = css`
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff, #9ca3af);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 16px;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin: 0 12px;
  }
`

const loadingBarStyle = css`
  width: 200px;
  height: 4px;
  background: rgba(124, 58, 237, 0.2);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`

const loadingProgress = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, #7c3aed, #c084fc);
  border-radius: 4px;
`

export default function SplashScreen({ finishLoading }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Total splash screen duration: 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(finishLoading, 800) // Wait for exit animation to finish before notifying parent
    }, 2500)
    
    return () => clearTimeout(timer)
  }, [finishLoading])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          css={splashContainer}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <motion.div
            css={backgroundGlow}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          
          <div css={logoContainer}>
            <motion.span 
              css={bracketStyle}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              &lt;
            </motion.span>
            
            <motion.span 
              css={nameStyle}
              initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              Mirsab
            </motion.span>
            
            <motion.span 
              css={bracketStyle}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              /&gt;
            </motion.span>
          </div>

          <div css={loadingBarStyle}>
            <motion.div 
              css={loadingProgress}
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
