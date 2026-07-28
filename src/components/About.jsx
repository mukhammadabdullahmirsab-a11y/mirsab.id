/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

const aboutSection = css`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 100px 5% 60px;
  display: flex;
  align-items: center;
`

const aboutGrid = css`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

const helloText = css`
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
`

const nameText = css`
  font-size: 3.2rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.1;
  letter-spacing: -0.02em;

  @media (max-width: 968px) {
    font-size: 2.8rem;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`

const bioText = css`
  color: #9ca3af;
  font-size: 1.05rem;
  line-height: 1.85;
  text-align: justify;
  max-width: 95%;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }
`

/* Profile Photo */
const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.15), 0 0 60px rgba(124, 58, 237, 0.08); }
  50% { box-shadow: 0 0 40px rgba(124, 58, 237, 0.3), 0 0 80px rgba(124, 58, 237, 0.15); }
`

const photoContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 968px) {
    order: -1;
  }
`

const photoWrapper = css`
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(20, 20, 50, 0.8));
  border: 4px solid rgba(124, 58, 237, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulseGlow} 5s ease-in-out infinite;
  overflow: hidden;
  position: relative;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 260px;
    height: 260px;
  }
`

const silhouetteStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

// Silhouette placeholder SVG
const SilhouettePlaceholder = () => (
  <svg css={silhouetteStyle} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="150" cy="130" r="55" fill="#2a2a5e" />
    <ellipse cx="150" cy="260" rx="85" ry="65" fill="#2a2a5e" />
  </svg>
)

export default function About() {
  const { language } = useLanguage()
  const t = translations[language].about

  return (
    <section id="about" css={aboutSection}>
      <div css={aboutGrid}>
        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 css={helloText}>{language === 'en' ? "Hello, I'm" : "Halo, Saya"}</h2>
          <h1 css={nameText}>Abdullah Mirsab</h1>
          <p css={bioText}>
            {t.description}
          </p>
        </motion.div>

        {/* Right - Photo */}
        <motion.div
          css={photoContainer}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div css={photoWrapper}>
            <SilhouettePlaceholder />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
