/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { css, keyframes } from '@emotion/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

const navLinkIds = ['home', 'about', 'portfolio', 'contact']

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

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

const navLinksStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;

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

const langToggleBtn = css`
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(124, 58, 237, 0.3);
  color: #c084fc;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;
  margin-left: 16px;

  &:hover {
    background: rgba(124, 58, 237, 0.25);
  }

  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: 12px;
  }
`

const mobileMenuStyle = css`
  position: fixed;
  top: var(--nav-height);
  left: 0;
  width: 100%;
  background: rgba(10, 10, 26, 0.95);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(124, 58, 237, 0.12);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 999;
  overflow: hidden;
`

const mobileNavLink = css`
  display: flex;
  align-items: center;
  padding: 18px 6%;
  color: #9ca3af;
  font-size: 1.05rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(100, 100, 200, 0.08);
  min-height: 56px;

  &:hover {
    color: #ffffff;
    background: rgba(124, 58, 237, 0.1);
    padding-left: 8%;
  }

  &:active {
    background: rgba(124, 58, 237, 0.18);
  }
`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]

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
        css={navStyle(scrolled)}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div css={css`display: flex; align-items: center;`}>
          <div css={logoStyle} onClick={() => scrollTo('home')}>
            Abdullah Mirsab
          </div>
          <span css={badgeStyle}>✨ Ready to Innovate</span>
        </div>

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

        <button css={langToggleBtn} onClick={toggleLanguage}>
          <Globe size={16} />
          {language.toUpperCase()}
        </button>

        <button css={mobileMenuBtn} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            css={mobileMenuStyle}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinkIds.map((id) => (
              <a
                key={id}
                css={mobileNavLink}
                onClick={() => scrollTo(id)}
              >
                {t.nav[id]}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
