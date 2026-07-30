/** @jsxImportSource @emotion/react */
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { FiGithub, FiMessageSquare, FiSend, FiUser } from 'react-icons/fi'
import { projects as staticProjects } from '../data/projects'
import { db } from '../config/firebase'
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore'
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

const commentSection = css`
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid rgba(100, 100, 200, 0.2);
`

const commentTitle = css`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
`

const commentForm = css`
  background: rgba(20, 20, 35, 0.6);
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const inputGroup = css`
  display: flex;
  flex-direction: column;
  gap: 8px;

  input, textarea {
    background: rgba(10, 10, 20, 0.8);
    border: 1px solid rgba(100, 100, 150, 0.2);
    border-radius: 12px;
    padding: 14px;
    color: #fff;
    font-family: inherit;
    font-size: 0.95rem;

    &:focus {
      outline: none;
      border-color: #7c3aed;
      box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.2);
    }
  }
`

const submitBtn = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`

const commentList = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const commentItem = css`
  background: rgba(10, 10, 26, 0.6);
  border: 1px solid rgba(100, 100, 150, 0.15);
  border-radius: 12px;
  padding: 20px;
`

const commentHeader = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language].projectDetail

  const [project, setProject] = useState(staticProjects.find((p) => p.id === parseInt(id)))
  
  // Comments state
  const [comments, setComments] = useState([])
  const [newName, setNewName] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchProjectAndComments()
  }, [id])

  const fetchProjectAndComments = async () => {
    if (!db) return
    try {
      // Fetch dynamic project info if exists
      const pQuery = query(collection(db, 'projects'), where('__name__', '==', id))
      const pSnapshot = await getDocs(pQuery)
      if (!pSnapshot.empty) {
        setProject({ id: pSnapshot.docs[0].id, ...pSnapshot.docs[0].data() })
      }

      // Fetch comments
      const cQuery = query(collection(db, 'comments'), where('projectId', '==', id))
      const cSnapshot = await getDocs(cQuery)
      const data = cSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      // Sort client side since we might not have composite index
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setComments(data)
    } catch (err) {
      console.error("Error fetching data:", err)
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!db) {
      alert("Firebase belum dikonfigurasi. Tidak bisa mengirim komentar.")
      return
    }
    
    setIsSubmitting(true)
    try {
      const newComment = {
        projectId: id,
        name: newName,
        message: newMessage,
        createdAt: new Date().toISOString()
      }
      await addDoc(collection(db, 'comments'), newComment)
      setNewName('')
      setNewMessage('')
      fetchProjectAndComments()
    } catch (error) {
      console.error("Gagal mengirim komentar:", error)
      alert("Gagal mengirim komentar")
    } finally {
      setIsSubmitting(false)
    }
  }

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

        {/* --- COMMENT SECTION --- */}
        <div css={commentSection}>
          <h2 css={commentTitle}>
            <FiMessageSquare /> Komentar Pengunjung
          </h2>

          <form css={commentForm} onSubmit={handleCommentSubmit}>
            <div css={inputGroup}>
              <input 
                type="text" 
                placeholder="Nama Anda" 
                value={newName}
                onChange={e => setNewName(e.target.value)}
                required
              />
            </div>
            <div css={inputGroup}>
              <textarea 
                rows="4" 
                placeholder="Tuliskan komentar, saran, atau masukan Anda tentang proyek ini..." 
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" css={submitBtn} disabled={isSubmitting}>
              <FiSend size={16} /> {isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}
            </button>
          </form>

          <div css={commentList}>
            {comments.length === 0 ? (
              <p style={{ color: '#9ca3af', textAlign: 'center', padding: '20px 0' }}>Belum ada komentar. Jadilah yang pertama!</p>
            ) : (
              comments.map(c => (
                <div key={c.id} css={commentItem}>
                  <div css={commentHeader}>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff' }}>
                      <FiUser /> {c.name}
                    </strong>
                    <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ color: '#d1d5db', lineHeight: 1.5 }}>{c.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}
