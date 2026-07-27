/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Clock, Eye, Heart, MessageCircle, Share2, X, Tag, User } from 'lucide-react'

const accent = '#0891b2'
const accentLight = '#22d3ee'
const page = css`min-height:100vh;background:#020c10;color:#fff;font-family:'Poppins',sans-serif;`
const nav = css`display:flex;align-items:center;justify-content:space-between;padding:16px 5%;border-bottom:1px solid rgba(8,145,178,0.15);background:rgba(2,12,16,0.9);backdrop-filter:blur(12px);position:sticky;top:0;z-index:100;`
const backBtn = css`display:inline-flex;align-items:center;gap:6px;background:rgba(8,145,178,0.1);border:1px solid rgba(8,145,178,0.3);color:${accentLight};padding:8px 16px;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;transition:all 0.2s;&:hover{background:rgba(8,145,178,0.2);}`
const logo = css`font-size:1.4rem;font-weight:800;background:linear-gradient(135deg,${accent},${accentLight});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;`

const hero = css`padding:70px 5% 50px;background:radial-gradient(ellipse at 30% 50%,rgba(8,145,178,0.12) 0%,transparent 60%);`
const heroTag = css`display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:50px;background:rgba(8,145,178,0.1);border:1px solid rgba(8,145,178,0.2);color:${accentLight};font-size:0.8rem;font-weight:600;margin-bottom:16px;`
const heroTitle = css`font-size:3.2rem;font-weight:800;line-height:1.2;margin-bottom:14px;max-width:600px;@media(max-width:768px){font-size:2rem;}`
const heroSub = css`color:#67e8f9;margin-bottom:28px;max-width:500px;`
const heroSearch = css`display:flex;max-width:460px;background:rgba(10,30,35,0.8);border:1px solid rgba(8,145,178,0.25);border-radius:12px;overflow:hidden;`
const heroInput = css`flex:1;padding:12px 16px;background:transparent;border:none;color:#fff;outline:none;&::placeholder{color:#155e75;}`
const heroSearchBtn = css`padding:12px 20px;background:linear-gradient(135deg,${accent},${accentLight});color:#fff;border:none;cursor:pointer;&:hover{filter:brightness(1.1);}`

const mainLayout = css`display:grid;grid-template-columns:1fr 280px;gap:28px;max-width:1100px;margin:0 auto;padding:40px 5% 60px;@media(max-width:900px){grid-template-columns:1fr;}`
const sidebar = css`@media(max-width:900px){display:none;}`

const sideCard = css`background:rgba(10,20,25,0.7);border:1px solid rgba(8,145,178,0.12);border-radius:16px;padding:20px;margin-bottom:20px;`
const sideTitle = css`color:${accentLight};font-weight:600;font-size:0.9rem;margin-bottom:14px;display:flex;align-items:center;gap:6px;`
const catList = css`display:flex;flex-direction:column;gap:6px;`
const catItem2 = (a) => css`display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border-radius:8px;cursor:pointer;background:${a?'rgba(8,145,178,0.1)':'transparent'};border:1px solid ${a?'rgba(8,145,178,0.3)':'transparent'};transition:all 0.2s;&:hover{background:rgba(8,145,178,0.08);}`
const catName = (a) => css`font-size:0.85rem;color:${a?accentLight:'#94a3b8'};`
const catCount = css`font-size:0.75rem;color:#155e75;background:rgba(8,145,178,0.08);padding:2px 8px;border-radius:10px;`

const articleCard = css`background:rgba(10,20,25,0.7);border:1px solid rgba(8,145,178,0.1);border-radius:18px;overflow:hidden;margin-bottom:22px;transition:all 0.3s;&:hover{border-color:rgba(8,145,178,0.3);box-shadow:0 6px 24px rgba(8,145,178,0.1);}`
const articleImgArea = css`height:200px;display:flex;align-items:center;justify-content:center;font-size:5rem;`
const articleBody = css`padding:22px;`
const articleCat = css`display:inline-block;padding:4px 12px;border-radius:6px;background:rgba(8,145,178,0.1);color:${accentLight};font-size:0.75rem;font-weight:600;margin-bottom:10px;`
const articleTitle = css`font-size:1.2rem;font-weight:700;color:#fff;margin-bottom:8px;line-height:1.4;cursor:pointer;&:hover{color:${accentLight};}`
const articleExcerpt = css`color:#94a3b8;font-size:0.85rem;line-height:1.6;margin-bottom:14px;`
const articleMeta = css`display:flex;align-items:center;gap:16px;color:#64748b;font-size:0.8rem;`
const articleActions = css`display:flex;gap:12px;margin-left:auto;`
const actionBtn = (liked) => css`display:flex;align-items:center;gap:4px;color:${liked?'#f43f5e':'#64748b'};background:none;border:none;cursor:pointer;font-size:0.8rem;transition:color 0.2s;&:hover{color:${liked?'#f43f5e':accentLight};}`

const modalOverlay = css`position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(6px);z-index:200;display:flex;align-items:flex-start;justify-content:center;padding:40px 20px;overflow-y:auto;`
const modalContent = css`background:#07161c;border:1px solid rgba(8,145,178,0.2);border-radius:20px;padding:36px;max-width:680px;width:100%;position:relative;`
const modalClose = css`position:absolute;top:16px;right:16px;background:rgba(8,145,178,0.1);border:none;color:${accentLight};border-radius:8px;width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;&:hover{background:rgba(8,145,178,0.2);}`

const commentBox = css`background:rgba(8,145,178,0.05);border:1px solid rgba(8,145,178,0.15);border-radius:12px;padding:16px;margin-top:24px;`
const commentInput = css`width:100%;padding:10px 14px;background:rgba(10,20,25,0.8);border:1px solid rgba(8,145,178,0.15);border-radius:8px;color:#fff;outline:none;margin-bottom:8px;font-size:0.85rem;&::placeholder{color:#155e75;}`
const sendBtn = css`padding:9px 22px;border-radius:8px;background:linear-gradient(135deg,${accent},${accentLight});color:#fff;border:none;font-weight:600;font-size:0.85rem;cursor:pointer;`

const CATS_DATA = [
  { name: 'Semua', count: 6 }, { name: 'JavaScript', count: 2 }, { name: 'React', count: 2 },
  { name: 'CSS', count: 1 }, { name: 'Career', count: 1 }
]
const ARTICLES = [
  { id: 1, title: '10 Tips Menjadi Frontend Developer yang Produktif', cat: 'Career', emoji: '💼', bg: '#0891b2', excerpt: 'Sebagai seorang frontend developer, produktivitas bukan hanya soal menulis kode lebih cepat, tetapi tentang membuat keputusan yang tepat, menggunakan alat yang efisien, dan menjaga keseimbangan antara kualitas dan kecepatan.', date: '27 Jul 2026', readTime: '5 min', views: 1240, comments: ['Artikel yang sangat bermanfaat!', 'Terima kasih tips-nya!'] },
  { id: 2, title: 'Memahami React Hooks Secara Mendalam', cat: 'React', emoji: '⚛️', bg: '#7c3aed', excerpt: 'React Hooks merevolusi cara kita menulis komponen React. Dalam artikel ini, kita akan menjelajahi setiap hook bawaan secara mendalam, mulai dari useState, useEffect, useContext, hingga custom hooks.', date: '24 Jul 2026', readTime: '8 min', views: 2890, comments: [] },
  { id: 3, title: 'CSS Grid vs Flexbox: Kapan Menggunakan Mana?', cat: 'CSS', emoji: '🎨', bg: '#e11d48', excerpt: 'CSS Grid dan Flexbox keduanya adalah alat layout yang powerful di CSS modern. Keduanya memiliki kekuatan masing-masing dan sering kali bekerja paling baik ketika digunakan bersama-sama.', date: '20 Jul 2026', readTime: '6 min', views: 1870, comments: ['Sangat helpful!'] },
  { id: 4, title: 'JavaScript Async/Await: Panduan Lengkap', cat: 'JavaScript', emoji: '🔄', bg: '#d97706', excerpt: 'Penanganan operasi asynchronous adalah salah satu aspek paling penting dalam JavaScript modern. Dengan async/await, kode async kita bisa terlihat dan berperilaku seperti kode synchronous.', date: '15 Jul 2026', readTime: '7 min', views: 3210, comments: ['Sangat jelas penjelasannya!', 'Mantap bro!', 'Terima kasih'] },
]

export default function BlogDemo() {
  const navigate = useNavigate()
  const [activeCat, setActiveCat] = useState('Semua')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [likes, setLikes] = useState({})
  const [comments, setComments] = useState(ARTICLES.reduce((a, art) => ({ ...a, [art.id]: art.comments }), {}))
  const [commentInput, setCommentInput] = useState('')
  const [search, setSearch] = useState('')

  const filtered = ARTICLES.filter(a => {
    const mc = activeCat === 'Semua' || a.cat === activeCat
    const ms = !search || a.title.toLowerCase().includes(search.toLowerCase())
    return mc && ms
  })

  const sendComment = (artId) => {
    if (!commentInput.trim()) return
    setComments(p => ({ ...p, [artId]: [...p[artId], commentInput] }))
    setCommentInput('')
  }

  return (
    <div css={page}>
      <nav css={nav}>
        <button css={backBtn} onClick={() => navigate('/')}><ArrowLeft size={16}/> Kembali</button>
        <div css={logo}>DevBlog</div>
        <button css={css`${backBtn};`}>Tulis Artikel</button>
      </nav>

      <div css={hero}>
        <div css={heroTag}><Tag size={12}/> Blog Teknologi</div>
        <h1 css={heroTitle}>Belajar, Berbagi, & <span style={{ color: accentLight }}>Berkembang</span></h1>
        <p css={heroSub}>Artikel seputar web development, tips coding, dan perkembangan teknologi terkini.</p>
        <div css={heroSearch}>
          <Search size={16} style={{ margin: 'auto 12px', color: '#155e75' }}/>
          <input css={heroInput} placeholder="Cari artikel..." value={search} onChange={e => setSearch(e.target.value)}/>
          <button css={heroSearchBtn}><Search size={15}/></button>
        </div>
      </div>

      <div css={mainLayout}>
        <div>
          {filtered.map(art => (
            <div key={art.id} css={articleCard}>
              <div css={articleImgArea} style={{ background: art.bg + '18' }}>{art.emoji}</div>
              <div css={articleBody}>
                <span css={articleCat}>{art.cat}</span>
                <h2 css={articleTitle} onClick={() => setSelectedArticle(art)}>{art.title}</h2>
                <p css={articleExcerpt}>{art.excerpt.substring(0, 120)}...</p>
                <div css={articleMeta}>
                  <span css={css`display:flex;align-items:center;gap:4px;`}><User size={13}/> Abdullah Mirsab</span>
                  <span css={css`display:flex;align-items:center;gap:4px;`}><Clock size={13}/> {art.readTime}</span>
                  <span css={css`display:flex;align-items:center;gap:4px;`}><Eye size={13}/> {art.views.toLocaleString()}</span>
                  <div css={articleActions}>
                    <button css={actionBtn(likes[art.id])} onClick={() => setLikes(p => ({...p, [art.id]: !p[art.id]}))}>
                      <Heart size={15} fill={likes[art.id] ? '#f43f5e' : 'none'}/> {likes[art.id] ? 'Disukai' : 'Suka'}
                    </button>
                    <button css={actionBtn(false)} onClick={() => setSelectedArticle(art)}>
                      <MessageCircle size={15}/> {comments[art.id]?.length || 0}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div css={sidebar}>
          <div css={sideCard}>
            <div css={sideTitle}><Tag size={14}/> Kategori</div>
            <div css={catList}>
              {CATS_DATA.map(c => (
                <div key={c.name} css={catItem2(activeCat === c.name)} onClick={() => setActiveCat(c.name)}>
                  <span css={catName(activeCat === c.name)}>{c.name}</span>
                  <span css={catCount}>{c.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div css={sideCard}>
            <div css={sideTitle}>🔥 Artikel Populer</div>
            {ARTICLES.sort((a,b) => b.views - a.views).slice(0,3).map(a => (
              <div key={a.id} css={css`display:flex;gap:10px;margin-bottom:12px;cursor:pointer;&:hover div{color:${accentLight};};`} onClick={() => setSelectedArticle(a)}>
                <div css={css`font-size:1.5rem;flex-shrink:0;`}>{a.emoji}</div>
                <div>
                  <div css={css`font-size:0.8rem;color:#d1d5db;line-height:1.3;transition:color 0.2s;`}>{a.title.substring(0,50)}...</div>
                  <div css={css`font-size:0.72rem;color:#155e75;margin-top:4px;`}>{a.views.toLocaleString()} views</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedArticle && (
        <div css={modalOverlay} onClick={e => e.target === e.currentTarget && setSelectedArticle(null)}>
          <div css={modalContent}>
            <button css={modalClose} onClick={() => setSelectedArticle(null)}><X size={18}/></button>
            <span css={css`${articleCat};`}>{selectedArticle.cat}</span>
            <h2 css={css`font-size:1.6rem;font-weight:800;color:#fff;margin:10px 0 8px;`}>{selectedArticle.title}</h2>
            <div css={css`display:flex;gap:16px;color:#64748b;font-size:0.8rem;margin-bottom:20px;`}>
              <span><User size={12} style={{ marginRight: 4 }}/>Abdullah Mirsab</span>
              <span><Clock size={12} style={{ marginRight: 4 }}/>{selectedArticle.date} • {selectedArticle.readTime} read</span>
            </div>
            <div css={css`color:#94a3b8;line-height:1.8;font-size:0.95rem;`}>
              <p css={css`margin-bottom:16px;`}>{selectedArticle.excerpt}</p>
              <p css={css`margin-bottom:16px;`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div css={css`display:flex;gap:12px;margin-top:20px;`}>
              <button css={actionBtn(likes[selectedArticle.id])} onClick={() => setLikes(p => ({...p,[selectedArticle.id]:!p[selectedArticle.id]}))}>
                <Heart size={16} fill={likes[selectedArticle.id] ? '#f43f5e' : 'none'}/> {likes[selectedArticle.id] ? 'Disukai' : 'Suka'}
              </button>
              <button css={actionBtn(false)}><Share2 size={16}/> Bagikan</button>
            </div>
            <div css={commentBox}>
              <div css={css`color:${accentLight};font-weight:600;font-size:0.9rem;margin-bottom:12px;`}><MessageCircle size={15} style={{ marginRight: 6 }}/>Komentar ({comments[selectedArticle.id]?.length || 0})</div>
              {comments[selectedArticle.id]?.map((c, i) => (
                <div key={i} css={css`padding:10px 14px;background:rgba(8,145,178,0.06);border-radius:8px;margin-bottom:8px;font-size:0.85rem;color:#d1d5db;`}>
                  <span css={css`color:${accentLight};font-weight:600;font-size:0.8rem;`}>Pembaca • </span>{c}
                </div>
              ))}
              <input css={commentInput} placeholder="Tulis komentar..." value={commentInput} onChange={e => setCommentInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendComment(selectedArticle.id)}/>
              <button css={sendBtn} onClick={() => sendComment(selectedArticle.id)}>Kirim</button>
            </div>
          </div>
        </div>
      )}
      <div css={css`text-align:center;padding:24px;color:#155e75;font-size:0.8rem;border-top:1px solid rgba(8,145,178,0.08);`}>© 2026 DevBlog — Demo oleh Abdullah Mirsab</div>
    </div>
  )
}
