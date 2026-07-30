/** @jsxImportSource @emotion/react */
import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import { motion, AnimatePresence } from 'framer-motion'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { ExternalLink, ArrowRight, Award, X, ZoomIn, Calendar, Building2 } from 'lucide-react'
import { projects as staticProjects } from '../data/projects'
import { certificates } from '../data/certificates'
import { techStack } from '../data/techStack'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'
import { db } from '../config/firebase'
import { collection, getDocs } from 'firebase/firestore'

const portfolioSection = css`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 100px 5% 60px;
`

const container = css`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`

const tabsWrapper = css`
  margin-bottom: 40px;
  .MuiTabs-root {
    background: rgba(20, 20, 50, 0.4);
    border-radius: 12px;
    border: 1px solid rgba(100, 100, 200, 0.1);
    padding: 4px;
  }
  .MuiTab-root {
    min-height: 48px;
    border-radius: 8px;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    &.Mui-selected {
      background: rgba(124, 58, 237, 0.15);
      color: #ffffff;
      font-weight: 600;
    }
  }
`

/* ============ PROJECTS TAB ============ */
const projectsGrid = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const projectCard = css`
  background: rgba(20, 20, 50, 0.5);
  border: 1px solid rgba(100, 100, 200, 0.12);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: rgba(124, 58, 237, 0.35);
    transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(124, 58, 237, 0.2);
    background: rgba(30, 30, 70, 0.6);
  }
`

const projectImage = css`
  width: 100%;
  height: 220px;
  object-fit: cover;
  background: #0d1033;
  display: flex;
  align-items: center;
  justify-content: center;
`

const projectImagePlaceholder = css`
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, #0d1033, #1a1a3e);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b3b7e;
  font-size: 3rem;
`

const projectBody = css`
  padding: 24px;
`

const projectTitle = css`
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 10px;
`

const projectDesc = css`
  color: #9ca3af;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const projectFooter = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const liveLink = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #a855f7;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  padding: 8px 4px;
  min-height: 44px;

  &:hover {
    color: #c084fc;
    transform: translateX(4px);
  }
`

const detailsBtn = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 24px;
  border-radius: 10px;
  border: 1px solid rgba(100, 100, 200, 0.2);
  background: transparent;
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 44px;

  &:hover {
    border-color: #7c3aed;
    background: rgba(124, 58, 237, 0.1);
    transform: translateY(-2px);
  }
`

/* ============ CERTIFICATES TAB ============ */
const certsGrid = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const certCard = css`
  background: rgba(20, 20, 50, 0.5);
  border: 1px solid rgba(100, 100, 200, 0.12);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: rgba(124, 58, 237, 0.4);
    transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(124, 58, 237, 0.2);
    background: rgba(30, 30, 70, 0.6);
  }

  &:hover img {
    transform: scale(1.05);
  }

  &:hover .cert-overlay {
    opacity: 1;
  }
`

const certImageWrapper = css`
  width: 100%;
  height: 280px;
  background: rgba(10, 10, 25, 0.6);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    height: 220px;
  }
`

const certImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`

const certOverlay = css`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`

const certZoomIcon = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(124, 58, 237, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  backdrop-filter: blur(4px);
`

const certIconStyle = css`
  width: 100%;
  height: 280px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(168, 85, 247, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c084fc;

  @media (max-width: 768px) {
    height: 220px;
  }
`

const certBody = css`
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const certTitle = css`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.4;
`

const certIssuer = css`
  color: #9ca3af;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;
`

const certDate = css`
  color: #6b7280;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 6px;
`

const lightboxOverlay = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: zoom-out;
`

const lightboxImage = css`
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`

const lightboxClose = css`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10000;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`

const lightboxInfo = css`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(20, 20, 50, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(100, 100, 200, 0.15);
  border-radius: 16px;
  padding: 16px 28px;
  text-align: center;
  z-index: 10000;
  max-width: 500px;

  h3 {
    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 4px;
  }

  p {
    color: #9ca3af;
    font-size: 0.85rem;
  }
`

/* ============ TECH STACK TAB ============ */
const techGrid = css`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const techCard = css`
  background: rgba(20, 20, 50, 0.5);
  border: 1px solid rgba(100, 100, 200, 0.12);
  border-radius: 16px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: rgba(124, 58, 237, 0.4);
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 12px 30px rgba(124, 58, 237, 0.2);
    background: rgba(30, 30, 70, 0.6);
  }

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    filter: drop-shadow(0 2px 8px rgba(124, 58, 237, 0.3));
  }

  span {
    color: #d1d5db;
    font-size: 0.85rem;
    font-weight: 500;
    text-align: center;
  }
`

const tabPanelVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.05 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Portfolio() {
  const [tab, setTab] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const [projects, setProjects] = useState(staticProjects) // Default to static
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language].portfolio

  useEffect(() => {
    const fetchProjects = async () => {
      if (!db) return
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'))
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          setProjects(data)
        }
      } catch (error) {
        console.error("Error fetching projects from Firebase, falling back to static:", error)
      }
    }
    fetchProjects()
  }, [])

  const openLightbox = useCallback((cert) => {
    if (cert.image) setLightbox(cert)
  }, [])
  const closeLightbox = useCallback(() => setLightbox(null), [])

  return (
    <section id="portfolio" css={portfolioSection}>
      <div css={container}>
        {/* Tabs */}
        <div css={tabsWrapper}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="fullWidth"
            textColor="inherit"
          >
            <Tab label={t.tabs.projects} />
            <Tab label={t.tabs.certificates} />
            <Tab label={t.tabs.techStack} />
          </Tabs>
        </div>

        {/* Tab Panels */}
        <AnimatePresence mode="wait">
          {tab === 0 && (
            <motion.div
              key="projects"
              css={projectsGrid}
              variants={tabPanelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {projects.map((project) => (
                <motion.div key={project.id} css={projectCard} variants={cardVariants}>
                  {project.image ? (
                    <div css={projectImage}>
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div css={projectImagePlaceholder}>
                      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <rect x="10" y="15" width="60" height="40" rx="4" stroke="#3b3b7e" strokeWidth="2" fill="none"/>
                        <rect x="30" y="55" width="20" height="5" rx="2" fill="#3b3b7e"/>
                        <rect x="25" y="58" width="30" height="3" rx="1.5" fill="#3b3b7e"/>
                        <rect x="18" y="23" width="20" height="3" rx="1.5" fill="#7c3aed" opacity="0.5"/>
                        <rect x="18" y="30" width="30" height="3" rx="1.5" fill="#6366f1" opacity="0.3"/>
                        <rect x="18" y="37" width="15" height="3" rx="1.5" fill="#a855f7" opacity="0.4"/>
                      </svg>
                    </div>
                  )}

                  <div css={projectBody}>
                    <h3 css={projectTitle}>{project.title}</h3>
                    <p css={projectDesc}>{project.description}</p>
                    <div css={projectFooter}>
                      <button css={liveLink} onClick={() => navigate(project.liveUrl)}>
                        {t.liveDemo} <ExternalLink size={14} />
                      </button>
                      <button css={detailsBtn} onClick={() => navigate(`/project/${project.id}`)}>
                        {t.details} <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === 1 && (
            <motion.div
              key="certificates"
              css={certsGrid}
              variants={tabPanelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {certificates.map((cert) => (
                <motion.div key={cert.id} css={certCard} variants={cardVariants} onClick={() => openLightbox(cert)}>
                  {cert.image ? (
                    <div css={certImageWrapper}>
                      <img src={cert.image} alt={cert.title} css={certImageStyle} loading="lazy" />
                      <div css={certOverlay} className="cert-overlay">
                        <div css={certZoomIcon}>
                          <ZoomIn size={22} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div css={certIconStyle}>
                      <Award size={48} />
                    </div>
                  )}
                  <div css={certBody}>
                    <h3 css={certTitle}>{cert.title}</h3>
                    <p css={certIssuer}><Building2 size={13} /> {cert.issuer}</p>
                    <span css={certDate}><Calendar size={13} /> {cert.date}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === 2 && (
            <motion.div
              key="techstack"
              css={techGrid}
              variants={tabPanelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {techStack.map((tech) => (
                <motion.div key={tech.name} css={techCard} variants={cardVariants}>
                  <img src={tech.icon} alt={tech.name} loading="lazy" />
                  <span>{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            css={lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button css={lightboxClose} onClick={closeLightbox}>
              <X size={20} />
            </button>
            <motion.img
              src={lightbox.image}
              alt={lightbox.title}
              css={lightboxImage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
            <div css={lightboxInfo} onClick={(e) => e.stopPropagation()}>
              <h3>{lightbox.title}</h3>
              <p>{lightbox.issuer} • {lightbox.date}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
