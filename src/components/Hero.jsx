/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { motion } from 'framer-motion'
import { ExternalLink, Mail, Download, ArrowRight } from 'lucide-react'
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'
import Typewriter from 'typewriter-effect'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

const heroSection = css`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 5% 60px;

  @media (max-width: 768px) {
    padding: 100px 5% 40px;
  }
`

const heroGrid = css`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
`

const heroTitle = css`
  font-size: 3.8rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 12px;
  letter-spacing: -0.02em;

  @media (max-width: 968px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

const gradientText = css`
  background: linear-gradient(135deg, #7c3aed, #a855f7, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const typewriterStyle = css`
  font-size: 1.3rem;
  color: #9ca3af;
  margin: 12px 0 16px;
  min-height: 32px;

  .Typewriter__wrapper {
    color: #9ca3af;
  }
  .Typewriter__cursor {
    color: #7c3aed;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const descriptionStyle = css`
  color: #6b7280;
  font-size: 1.05rem;
  line-height: 1.75;
  max-width: 520px;
  margin-bottom: 28px;

  @media (max-width: 968px) {
    margin: 0 auto 28px;
    max-width: 480px;
  }
`

const tagsRow = css`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 28px;

  @media (max-width: 968px) {
    justify-content: center;
  }
`

const buttonsRow = css`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 968px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`

const socialsRow = css`
  display: flex;
  gap: 16px;

  @media (max-width: 968px) {
    justify-content: center;
  }
`

const socialIcon = css`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(100, 100, 200, 0.2);
  background: rgba(20, 20, 50, 0.5);
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;

  &:hover {
    border-color: #7c3aed;
    color: #c084fc;
    background: rgba(124, 58, 237, 0.15);
    transform: translateY(-4px) scale(1.08);
    box-shadow: 0 6px 20px rgba(124, 58, 237, 0.35);
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }
`

/* ==== HERO ILLUSTRATION ==== */
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
`

const illustrationContainer = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 968px) {
    order: -1;
    max-width: 400px;
    margin: 0 auto;
  }
`

const illustrationSvg = css`
  width: 100%;
  max-width: 500px;
  animation: ${float} 6s ease-in-out infinite;
  filter: drop-shadow(0 20px 40px rgba(124, 58, 237, 0.2));
`

/* ==== STATS BAR ==== */
const statsBar = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 5%;
  position: relative;
  z-index: 1;
`

const statsContainer = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: -20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const statCard = css`
  background: rgba(20, 20, 50, 0.5);
  border: 1px solid rgba(100, 100, 200, 0.12);
  border-radius: 20px;
  padding: 28px;
  text-align: center;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

  &:hover {
    border-color: rgba(124, 58, 237, 0.35);
    transform: translateY(-6px);
    box-shadow: 0 12px 36px rgba(124, 58, 237, 0.2);
    background: rgba(30, 30, 70, 0.5);
  }

  h3 {
    font-size: 2.2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #7c3aed, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
  }

  p {
    color: #9ca3af;
    font-size: 0.9rem;
    font-weight: 500;
  }
`

const DeveloperIllustration = () => (
  <svg css={illustrationSvg} viewBox="0 0 500 450" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Monitor */}
    <rect x="100" y="80" width="300" height="200" rx="12" fill="#1a1a3e" stroke="#3b3b7e" strokeWidth="2"/>
    <rect x="115" y="95" width="270" height="165" rx="8" fill="#0d1033"/>

    {/* Code lines on screen */}
    <rect x="130" y="110" width="100" height="8" rx="4" fill="#7c3aed" opacity="0.8"/>
    <rect x="130" y="128" width="160" height="8" rx="4" fill="#6366f1" opacity="0.5"/>
    <rect x="150" y="146" width="120" height="8" rx="4" fill="#a855f7" opacity="0.6"/>
    <rect x="150" y="164" width="140" height="8" rx="4" fill="#34d399" opacity="0.5"/>
    <rect x="130" y="182" width="80" height="8" rx="4" fill="#c084fc" opacity="0.4"/>
    <rect x="130" y="200" width="180" height="8" rx="4" fill="#6366f1" opacity="0.3"/>
    <rect x="150" y="218" width="100" height="8" rx="4" fill="#7c3aed" opacity="0.5"/>
    <rect x="130" y="236" width="60" height="8" rx="4" fill="#a855f7" opacity="0.4"/>

    {/* Monitor stand */}
    <rect x="220" y="280" width="60" height="20" rx="2" fill="#252560"/>
    <rect x="190" y="296" width="120" height="10" rx="5" fill="#252560"/>

    {/* Floating elements - gear */}
    <circle cx="430" cy="100" r="30" fill="none" stroke="#6b7280" strokeWidth="3" opacity="0.5">
      <animateTransform attributeName="transform" type="rotate" from="0 430 100" to="360 430 100" dur="10s" repeatCount="indefinite"/>
    </circle>
    <circle cx="430" cy="100" r="12" fill="#1a1a3e" stroke="#6b7280" strokeWidth="2" opacity="0.5"/>

    {/* Floating code bracket */}
    <g transform="translate(60, 150)">
      <rect width="50" height="50" rx="10" fill="rgba(124, 58, 237, 0.2)" stroke="#7c3aed" strokeWidth="1.5"/>
      <text x="25" y="33" textAnchor="middle" fill="#c084fc" fontSize="22" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
    </g>

    {/* Floating cloud */}
    <g transform="translate(380, 50)" opacity="0.4">
      <circle cx="20" cy="20" r="15" fill="#3b3b7e"/>
      <circle cx="40" cy="15" r="18" fill="#3b3b7e"/>
      <circle cx="55" cy="22" r="12" fill="#3b3b7e"/>
      <rect x="10" y="20" width="50" height="15" rx="4" fill="#3b3b7e"/>
      {/* Download arrow */}
      <path d="M35 10 L35 30 M28 23 L35 30 L42 23" stroke="#a855f7" strokeWidth="2" strokeLinecap="round"/>
    </g>

    {/* Mobile phone */}
    <g transform="translate(400, 200)">
      <rect width="55" height="90" rx="10" fill="#1a1a3e" stroke="#3b3b7e" strokeWidth="1.5"/>
      <rect x="6" y="12" width="43" height="60" rx="4" fill="#0d1033"/>
      <rect x="12" y="20" width="30" height="5" rx="2" fill="#7c3aed" opacity="0.6"/>
      <rect x="12" y="30" width="20" height="5" rx="2" fill="#6366f1" opacity="0.4"/>
      <rect x="12" y="40" width="25" height="5" rx="2" fill="#a855f7" opacity="0.5"/>
      <circle cx="27" cy="80" r="4" fill="#3b3b7e"/>
      {/* Checkmark */}
      <circle cx="27" cy="55" r="7" fill="#34d399" opacity="0.3"/>
      <path d="M23 55 L26 58 L31 52" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </g>

    {/* Settings/wrench element */}
    <g transform="translate(50, 280)" opacity="0.5">
      <rect width="45" height="45" rx="10" fill="rgba(99, 102, 241, 0.15)" stroke="#6366f1" strokeWidth="1"/>
      <circle cx="22" cy="22" r="10" fill="none" stroke="#6366f1" strokeWidth="2"/>
      <circle cx="22" cy="22" r="4" fill="#6366f1"/>
    </g>

    {/* Decorative lines */}
    <line x1="320" y1="60" x2="400" y2="60" stroke="#3b3b7e" strokeWidth="1.5" opacity="0.3"/>
    <line x1="330" y1="68" x2="390" y2="68" stroke="#3b3b7e" strokeWidth="1.5" opacity="0.2"/>
    <line x1="340" y1="76" x2="380" y2="76" stroke="#3b3b7e" strokeWidth="1.5" opacity="0.15"/>

    {/* Dots decoration */}
    <circle cx="80" cy="100" r="3" fill="#7c3aed" opacity="0.4"/>
    <circle cx="95" cy="90" r="2" fill="#a855f7" opacity="0.3"/>
    <circle cx="70" cy="115" r="2.5" fill="#6366f1" opacity="0.35"/>
  </svg>
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  const { language } = useLanguage()
  const t = translations[language].hero

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section id="home" css={heroSection}>
        <div css={heroGrid}>
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 css={heroTitle} variants={itemVariants}>
              <span css={gradientText}>{t.greeting}</span>
              <br />
              Abdullah Mirsab
            </motion.h1>

            <motion.div css={typewriterStyle} variants={itemVariants}>
              <Typewriter
                options={{
                  strings: t.roles,
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 40,
                  delay: 80,
                }}
              />
            </motion.div>

            <motion.p css={descriptionStyle} variants={itemVariants}>
              {t.description}
            </motion.p>

            <motion.div css={tagsRow} variants={itemVariants}>
              {['Laravel', 'React', 'Javascript', 'Node.js', 'Tailwind'].map((tag) => (
                <span className="tech-tag" key={tag}>{tag}</span>
              ))}
            </motion.div>

            <motion.div css={buttonsRow} variants={itemVariants}>
              <button className="btn-outline" onClick={() => scrollTo('portfolio')}>
                Projects <ExternalLink size={16} />
              </button>
              <button className="btn-outline" onClick={() => scrollTo('contact')}>
                Contact <Mail size={16} />
              </button>
            </motion.div>

            <motion.div css={socialsRow} variants={itemVariants}>
              <a href="https://github.com/mukhammadabdullahmirsab-a11y/" target="_blank" rel="noopener noreferrer" css={socialIcon}>
                <FiGithub size={18} />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" css={socialIcon}>
                <FiLinkedin size={18} />
              </a>
              <a href="https://instagram.com/abmrs_rius" target="_blank" rel="noopener noreferrer" css={socialIcon}>
                <FiInstagram size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            css={illustrationContainer}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <DeveloperIllustration />
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <div css={statsBar}>
        <div css={statsContainer}>
          <motion.div
            css={statCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <h3>6+</h3>
            <p>{t.stats.projects}</p>
          </motion.div>
          <motion.div
            css={statCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3>4+</h3>
            <p>{t.stats.certificates}</p>
          </motion.div>
          <motion.div
            css={statCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3>{t.stats.fresh}</h3>
            <p>{t.stats.graduate}</p>
          </motion.div>
        </div>
      </div>
    </>
  )
}
