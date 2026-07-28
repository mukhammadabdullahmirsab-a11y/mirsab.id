/** @jsxImportSource @emotion/react */
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { projects } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const pageStyle = css`
  min-height: 100vh;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
`

const container = css`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 5%;
  flex: 1;
`

const backBtn = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(124, 58, 237, 0.1);
  color: #c084fc;
  border: 1px solid rgba(124, 58, 237, 0.3);
  padding: 10px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 40px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 48px;

  &:hover {
    background: rgba(124, 58, 237, 0.2);
    transform: translateX(-4px) scale(1.02);
    box-shadow: 0 4px 15px rgba(124, 58, 237, 0.2);
  }

  &:active {
    transform: translateX(-2px) scale(0.98);
  }
`

const projectHeader = css`
  margin-bottom: 30px;
`

const title = css`
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 16px;
`

const tagsRow = css`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
`

const tagStyle = css`
  padding: 6px 16px;
  border-radius: 50px;
  background: rgba(20, 20, 50, 0.6);
  border: 1px solid rgba(100, 100, 200, 0.2);
  color: #d1d5db;
  font-size: 0.85rem;
  font-weight: 500;
`

const imageContainer = css`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #0d1033, #1a1a3e);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(100, 100, 200, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const descriptionStyle = css`
  color: #9ca3af;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 40px;
`

const linksRow = css`
  display: flex;
  gap: 16px;
`

const linkBtn = css`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #7c3aed, #c084fc);
  color: #ffffff;
  padding: 14px 28px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 48px;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`

const githubBtn = css`
  ${linkBtn};
  background: rgba(20, 20, 50, 0.6);
  border: 1px solid rgba(100, 100, 200, 0.3);
  
  &:hover {
    background: rgba(40, 40, 70, 0.8);
    box-shadow: 0 8px 25px rgba(100, 100, 200, 0.15);
  }
`

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language].projectDetail

  const project = projects.find((p) => p.id === parseInt(id))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) {
    return (
      <div css={pageStyle}>
        <Navbar />
        <div css={container}>
          <h1 css={title}>Project Not Found</h1>
          <button css={backBtn} onClick={() => navigate('/')}>
            <ArrowLeft size={18} /> {t.back}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div css={pageStyle}>
      <Navbar />
      
      <div css={container}>
        <button css={backBtn} onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> {t.back}
        </button>

        <div css={projectHeader}>
          <h1 css={title}>{project.title}</h1>
          <div css={tagsRow}>
            {project.tags.map(tag => (
              <span key={tag} css={tagStyle}>{tag}</span>
            ))}
          </div>
        </div>

        <div css={imageContainer}>
          {project.image ? (
            <img src={project.image} alt={project.title} />
          ) : (
            <span style={{ color: '#3b3b7e', fontSize: '4rem' }}>{project.title.charAt(0)}</span>
          )}
        </div>

        <p css={descriptionStyle}>
          {project.description}
        </p>

        <div css={linksRow}>
          <a href={project.liveUrl !== '#' ? project.liveUrl : '#'} target="_blank" rel="noopener noreferrer" css={linkBtn}>
            <ExternalLink size={18} /> {t.liveDemo}
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" css={githubBtn}>
            <FiGithub size={18} /> {t.github}
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
