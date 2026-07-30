/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

const navLinkIds = ['home', 'about', 'portfolio', 'contact']

const navStyle = (scrolled) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${scrolled ? 'rgba(10, 10, 26, 0.8)' : 'transparent'};
  backdrop-filter: ${scrolled ? 'blur(24px) saturate(180%)' : 'none'};
  -webkit-backdrop-filter: ${scrolled ? 'blur(24px) saturate(180%)' : 'none'};
  border-bottom: ${scrolled ? '1px solid rgba(124, 58, 237, 0.12)' : '1px solid transparent'};
  box-shadow: ${scrolled ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none'};
`

const logoStyle = css`
  font-size: 1.3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  user-select: none;
`

const badgeStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 14px;
  border-radius: 50px;
  background: rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(124, 58, 237, 0.3);
  color: #c084fc;
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 16px;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`

const rightContainer = css`
  display: flex;
  align-items: center;
  gap: 16px;
`

const navLinksStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
  }
`

const navLinkStyle = (active) => css`
  padding: 10px 20px;
  color: ${active ? '#ffffff' : '#9ca3af'};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border-radius: 8px;
  text-decoration: none;
  min-height: 44px;
  display: inline-flex;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: ${active ? '60%' : '0'};
    height: 2px;
    background: linear-gradient(90deg, #7c3aed, #a855f7);
    border-radius: 2px;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${active ? '0 0 8px rgba(124, 58, 237, 0.5)' : 'none'};
  }

  &:hover {
    color: #ffffff;
    &::after {
      width: 60%;
    }
  }
`

const langToggleBtn = css`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(124, 58, 237, 0.3);
  color: #c084fc;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;
  min-height: 44px;

  &:hover {
    background: rgba(124, 58, 237, 0.25);
  }

  @media (max-width: 768px) {
    /* Slightly smaller padding on very small screens if needed */
    padding: 8px 10px;
  }
`

const mobileMenuBtn = css`
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 44px;
  min-height: 44px;
  z-index: 1001; /* Stay on top of mobile menu */

  &:hover {
    background: rgba(124, 58, 237, 0.15);
  }

  &:active {
    transform: scale(0.92);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

/* Full-Screen Mobile Menu Overlay */
const mobileMenuOverlay = css`
  position: fixed;
  inset: 0;
  background: rgba(3, 0, 20, 0.98);
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const mobileNavLinksContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
`

const mobileNavLinkStyle = (active) => css`
  color: ${active ? '#ffffff' : '#9ca3af'};
  font-size: 2rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  /* Touch target size */
  padding: 10px 20px;

  &:hover {
    color: #ffffff;
    transform: scale(1.05);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: ${active ? '40px' : '0'};
    height: 4px;
    background: #7c3aed;
    border-radius: 2px;
    transition: width 0.3s ease;
  }
`

// Framer Motion Variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } 
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.3, ease: 'easeOut', delay: 0.2 } 
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } 
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]

  // Handle scroll detection and active section mapping
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section
      const sections = navLinkIds.map((id) => document.getElementById(id))
      const scrollPos = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navLinkIds[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [mobileOpen])

  const scrollTo = (id) => {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      // Need a slight delay to allow rendering before scrolling
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        css={navStyle(scrolled || mobileOpen)} // Ensure navbar is visible/styled when menu opens
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div css={css`display: flex; align-items: center; z-index: 1001;`}>
          <div css={logoStyle} onClick={() => scrollTo('home')}>
            Abdullah Mirsab
          </div>
          <span css={badgeStyle}>✨ Ready to Innovate</span>
        </div>

        {/* Right side container groups everything together */}
        <div css={rightContainer}>
          <ul css={navLinksStyle}>
            {navLinkIds.map((id) => (
              <li key={id}>
                <a
                  css={navLinkStyle(activeSection === id)}
                  onClick={() => scrollTo(id)}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>

          <button css={langToggleBtn} onClick={toggleLanguage} style={{ zIndex: 1001 }}>
            <FiGlobe size={18} />
            {language.toUpperCase()}
          </button>

          <button css={mobileMenuBtn} onClick={() => setMobileOpen(!mobileOpen)}>
            <motion.div
              initial={false}
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            css={mobileMenuOverlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div css={mobileNavLinksContainer} variants={staggerContainer} initial="hidden" animate="visible">
              {navLinkIds.map((id) => (
                <motion.div key={id} variants={staggerItem}>
                  <a
                    css={mobileNavLinkStyle(activeSection === id)}
                    onClick={() => scrollTo(id)}
                  >
                    {t.nav[id]}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
