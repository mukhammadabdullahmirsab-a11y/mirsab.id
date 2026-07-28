/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'
import { Heart } from 'lucide-react'
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'

const footerStyle = css`
  position: relative;
  z-index: 1;
  padding: 40px 5%;
  border-top: 1px solid rgba(100, 100, 200, 0.08);
`

const footerInner = css`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`

const copyText = css`
  color: #6b7280;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 4px;

  a {
    color: #a855f7;
    text-decoration: none;
    transition: color 0.2s;
    &:hover { color: #c084fc; }
  }
`

const socialLinks = css`
  display: flex;
  gap: 14px;
`

const socialLink = css`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(100, 100, 200, 0.15);
  color: #6b7280;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;

  &:hover {
    color: #c084fc;
    border-color: #7c3aed;
    background: rgba(124, 58, 237, 0.1);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 4px 15px rgba(124, 58, 237, 0.25);
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language].footer
  const year = new Date().getFullYear()

  return (
    <footer css={footerStyle}>
      <div css={footerInner}>
        <p css={copyText}>
          © {year} {t.madeWith} <Heart size={14} color="#ef4444" fill="#ef4444" /> {t.by}{' '}
          <a href="#home">Abdullah Mirsab</a>
        </p>
        <div css={socialLinks}>
          <a href="https://github.com/mukhammadabdullahmirsab-a11y/" target="_blank" rel="noopener noreferrer" css={socialLink}>
            <FiGithub size={16} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" css={socialLink}>
            <FiLinkedin size={16} />
          </a>
          <a href="https://instagram.com/abmrs_rius" target="_blank" rel="noopener noreferrer" css={socialLink}>
            <FiInstagram size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
