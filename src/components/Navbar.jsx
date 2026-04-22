/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { css, keyframes } from '@emotion/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portofolio' },
  { id: 'contact', label: 'Contact' },
]

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
  transition: all 0.3s ease;
  background: ${scrolled ? 'rgba(10, 10, 26, 0.85)' : 'transparent'};
  backdrop-filter: ${scrolled ? 'blur(20px)' : 'none'};
  border-bottom: ${scrolled ? '1px solid rgba(124, 58, 237, 0.1)' : 'none'};
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
  padding: 8px 20px;
  color: ${active ? '#ffffff' : '#9ca3af'};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 8px;
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: ${active ? '60%' : '0'};
    height: 2px;
    background: #7c3aed;
    border-radius: 2px;
    transition: width 0.3s ease;
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
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: rgba(124, 58, 237, 0.15);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const mobileMenuStyle = css`
  position: fixed;
  top: var(--nav-height);
  left: 0;
  width: 100%;
  background: rgba(10, 10, 26, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(124, 58, 237, 0.1);
  z-index: 999;
  overflow: hidden;
`

const mobileNavLink = css`
  display: block;
  padding: 16px 5%;
  color: #9ca3af;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid rgba(100, 100, 200, 0.08);

  &:hover {
    color: #ffffff;
    background: rgba(124, 58, 237, 0.1);
    padding-left: 7%;
  }
`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section
      const sections = navLinks.map((l) => document.getElementById(l.id))
      const scrollPos = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
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
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                css={navLinkStyle(activeSection === link.id)}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

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
            {navLinks.map((link) => (
              <a
                key={link.id}
                css={mobileNavLink}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
