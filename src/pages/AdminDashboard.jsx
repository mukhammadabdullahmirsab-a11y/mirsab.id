/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../config/firebase'
import { signOut } from 'firebase/auth'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { FiLogOut, FiPlus, FiTrash2, FiHome } from 'react-icons/fi'

const pageStyle = css`
  min-height: 100vh;
  background: #030014;
  color: #fff;
  padding: 40px 5%;
  font-family: 'Poppins', sans-serif;
`

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(124, 58, 237, 0.2);
  padding-bottom: 20px;
`

const titleStyle = css`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const btnStyle = (bg, hoverBg) => css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${bg};
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${hoverBg};
    transform: translateY(-2px);
  }
`

const cardStyle = css`
  background: rgba(20, 20, 35, 0.6);
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
`

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`

const projectCard = css`
  background: rgba(10, 10, 26, 0.8);
  border: 1px solid rgba(100, 100, 150, 0.2);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`

const formGroup = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;

  label {
    font-size: 0.9rem;
    color: #9ca3af;
  }

  input, textarea {
    background: rgba(10, 10, 20, 0.8);
    border: 1px solid rgba(100, 100, 150, 0.2);
    border-radius: 8px;
    padding: 12px;
    color: #fff;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: #7c3aed;
    }
  }
`

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  // Form states
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [tags, setTags] = useState('')
  const [liveUrl, setLiveUrl] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    if (!db) {
      setLoading(false)
      return
    }
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'))
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setProjects(data)
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth)
      navigate('/admin/login')
    }
  }

  const handleAddProject = async (e) => {
    e.preventDefault()
    if (!db) return

    try {
      const newProject = {
        title,
        description: desc,
        tags: tags.split(',').map(t => t.trim()),
        liveUrl,
        createdAt: new Date().toISOString()
      }
      await addDoc(collection(db, 'projects'), newProject)
      
      // Reset form
      setTitle('')
      setDesc('')
      setTags('')
      setLiveUrl('')
      setShowForm(false)
      
      // Refresh
      fetchProjects()
    } catch (error) {
      console.error("Error adding project:", error)
      alert("Gagal menambah proyek")
    }
  }

  const handleDelete = async (id) => {
    if (!db) return
    if (window.confirm('Yakin ingin menghapus proyek ini?')) {
      try {
        await deleteDoc(doc(db, 'projects', id))
        fetchProjects()
      } catch (error) {
        console.error("Error deleting project:", error)
      }
    }
  }

  return (
    <div css={pageStyle}>
      <div css={headerStyle}>
        <div>
          <h1 css={titleStyle}>Admin Dashboard</h1>
          <p style={{ color: '#9ca3af' }}>Kelola data portofolio Anda secara dinamis.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button css={btnStyle('rgba(124,58,237,0.2)', 'rgba(124,58,237,0.4)')} onClick={() => navigate('/')}>
            <FiHome /> Beranda
          </button>
          <button css={btnStyle('#ef4444', '#dc2626')} onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {!db ? (
        <div css={cardStyle} style={{ textAlign: 'center', padding: '40px' }}>
          <h2 style={{ color: '#ef4444' }}>Firebase Belum Tersambung</h2>
          <p style={{ color: '#9ca3af' }}>Harap lengkapi config di <code>src/config/firebase.js</code> terlebih dahulu agar bisa menggunakan fitur CMS ini.</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Daftar Proyek</h2>
            <button css={btnStyle('#7c3aed', '#6d28d9')} onClick={() => setShowForm(!showForm)}>
              <FiPlus /> {showForm ? 'Batal' : 'Tambah Proyek'}
            </button>
          </div>

          {showForm && (
            <div css={cardStyle}>
              <h3 style={{ marginBottom: '20px' }}>Tambah Proyek Baru</h3>
              <form onSubmit={handleAddProject}>
                <div css={formGroup}>
                  <label>Judul Proyek</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div css={formGroup}>
                  <label>Deskripsi</label>
                  <textarea rows="3" value={desc} onChange={e => setDesc(e.target.value)} required></textarea>
                </div>
                <div css={formGroup}>
                  <label>Tags (pisahkan dengan koma)</label>
                  <input type="text" placeholder="React, Tailwind, Firebase" value={tags} onChange={e => setTags(e.target.value)} required />
                </div>
                <div css={formGroup}>
                  <label>Link Live / Demo</label>
                  <input type="text" placeholder="/demo/nama-proyek atau https://..." value={liveUrl} onChange={e => setLiveUrl(e.target.value)} required />
                </div>
                <button type="submit" css={btnStyle('#10b981', '#059669')} style={{ marginTop: '10px' }}>Simpan Proyek</button>
              </form>
            </div>
          )}

          {loading ? (
            <p>Memuat data...</p>
          ) : (
            <div css={gridStyle}>
              {projects.length === 0 ? (
                <p style={{ color: '#9ca3af' }}>Belum ada proyek di database Firebase Anda.</p>
              ) : (
                projects.map(p => (
                  <div key={p.id} css={projectCard}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{p.title}</h3>
                    <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '16px', flex: 1 }}>{p.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      {p.tags?.map(t => (
                        <span key={t} style={{ background: 'rgba(124,58,237,0.2)', color: '#c084fc', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>{t}</span>
                      ))}
                    </div>
                    <button css={btnStyle('rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.2)')} style={{ color: '#ef4444', width: 'fit-content' }} onClick={() => handleDelete(p.id)}>
                      <FiTrash2 /> Hapus
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
