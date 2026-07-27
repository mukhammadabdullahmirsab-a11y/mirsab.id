/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Book, BookOpen, Star, Filter, CheckCircle, X } from 'lucide-react'

const accent = '#d97706'
const accentLight = '#f59e0b'
const page = css`min-height:100vh;background:#0c0800;color:#fff;font-family:'Poppins',sans-serif;`
const nav = css`display:flex;align-items:center;justify-content:space-between;padding:16px 5%;border-bottom:1px solid rgba(217,119,6,0.15);background:rgba(12,8,0,0.9);backdrop-filter:blur(12px);position:sticky;top:0;z-index:100;`
const backBtn = css`display:inline-flex;align-items:center;gap:6px;background:rgba(217,119,6,0.1);border:1px solid rgba(217,119,6,0.3);color:${accentLight};padding:8px 16px;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;transition:all 0.2s;&:hover{background:rgba(217,119,6,0.2);}`
const logo = css`font-size:1.4rem;font-weight:800;background:linear-gradient(135deg,${accent},${accentLight});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;`

const hero = css`padding:60px 5% 40px;background:radial-gradient(ellipse at center top,rgba(217,119,6,0.1) 0%,transparent 60%);text-align:center;`
const heroTitle = css`font-size:2.8rem;font-weight:800;margin-bottom:12px;@media(max-width:768px){font-size:2rem;}`
const heroSub = css`color:#d1a054;margin-bottom:28px;`

const searchBar = css`display:flex;max-width:600px;margin:0 auto;background:rgba(30,20,5,0.8);border:1px solid rgba(217,119,6,0.25);border-radius:12px;overflow:hidden;`
const searchInput = css`flex:1;padding:14px 18px;background:transparent;border:none;color:#fff;font-size:0.95rem;outline:none;&::placeholder{color:#92400e;}`
const searchBtnStyle = css`padding:14px 24px;background:linear-gradient(135deg,${accent},${accentLight});color:#fff;border:none;font-weight:600;cursor:pointer;&:hover{filter:brightness(1.1);}`

const statsRow = css`display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:900px;margin:40px auto;padding:0 5%;@media(max-width:768px){grid-template-columns:repeat(2,1fr);}`
const statCard = css`background:rgba(30,20,5,0.7);border:1px solid rgba(217,119,6,0.15);border-radius:14px;padding:20px;text-align:center;h3{font-size:1.8rem;font-weight:700;color:${accentLight};}p{color:#92400e;font-size:0.8rem;}`

const main = css`max-width:1200px;margin:0 auto;padding:0 5% 60px;display:grid;grid-template-columns:220px 1fr;gap:28px;@media(max-width:900px){grid-template-columns:1fr;}`
const sidebar = css`background:rgba(30,20,5,0.6);border:1px solid rgba(217,119,6,0.12);border-radius:16px;padding:20px;height:fit-content;`
const sideTitle = css`color:${accentLight};font-weight:600;margin-bottom:14px;font-size:0.9rem;display:flex;align-items:center;gap:6px;`
const catItem = (active) => css`padding:8px 12px;border-radius:8px;cursor:pointer;font-size:0.85rem;margin-bottom:4px;color:${active?accentLight:'#92400e'};background:${active?'rgba(217,119,6,0.1)':'transparent'};transition:all 0.2s;&:hover{background:rgba(217,119,6,0.1);color:${accentLight};}`

const booksGrid = css`display:grid;grid-template-columns:repeat(3,1fr);gap:20px;@media(max-width:1000px){grid-template-columns:repeat(2,1fr);}@media(max-width:600px){grid-template-columns:1fr;}`
const bookCard = css`background:rgba(30,20,5,0.7);border:1px solid rgba(217,119,6,0.12);border-radius:16px;overflow:hidden;transition:all 0.3s;&:hover{border-color:rgba(217,119,6,0.3);transform:translateY(-4px);box-shadow:0 8px 24px rgba(217,119,6,0.1);}`
const bookCover = css`height:180px;display:flex;align-items:center;justify-content:center;font-size:4rem;`
const bookBody = css`padding:16px;`
const bookTitle2 = css`font-size:1rem;font-weight:600;color:#fff;margin-bottom:4px;`
const bookAuthor = css`color:#92400e;font-size:0.8rem;margin-bottom:8px;`
const bookMeta = css`display:flex;justify-content:space-between;align-items:center;`
const availBadge = (av) => css`font-size:0.75rem;font-weight:600;padding:3px 10px;border-radius:6px;color:${av ? accentLight : '#ef4444'};background:${av ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.1)'};`
const borrowBtn = (av) => css`padding:7px 16px;border-radius:8px;background:${av?'linear-gradient(135deg,'+accent+','+accentLight+')':'rgba(100,100,100,0.2)'};color:${av?'#fff':'#64748b'};border:none;font-size:0.8rem;font-weight:600;cursor:${av?'pointer':'not-allowed'};transition:all 0.2s;&:hover{${av?'filter:brightness(1.1);':''}}`
const starsRow = css`display:flex;gap:2px;margin-bottom:8px;`

const modalOverlay = css`position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;`
const modalCard = css`background:#1c1200;border:1px solid rgba(217,119,6,0.2);border-radius:20px;padding:32px;max-width:400px;width:100%;text-align:center;`

const CATEGORIES = ['Semua', 'Teknologi', 'Fiksi', 'Sains', 'Bisnis', 'Sejarah']
const BOOKS = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', cat: 'Teknologi', color: '#d97706', emoji: '💻', available: true, rating: 4.8, total: 3, borrowed: 1 },
  { id: 2, title: 'Dune', author: 'Frank Herbert', cat: 'Fiksi', color: '#7c3aed', emoji: '🌌', available: true, rating: 4.9, total: 2, borrowed: 0 },
  { id: 3, title: 'A Brief History of Time', author: 'Stephen Hawking', cat: 'Sains', color: '#2563eb', emoji: '🌌', available: false, rating: 4.7, total: 2, borrowed: 2 },
  { id: 4, title: 'Zero to One', author: 'Peter Thiel', cat: 'Bisnis', color: '#059669', emoji: '🚀', available: true, rating: 4.6, total: 4, borrowed: 1 },
  { id: 5, title: 'Sapiens', author: 'Yuval Noah Harari', cat: 'Sejarah', color: '#e11d48', emoji: '🏛️', available: true, rating: 4.8, total: 3, borrowed: 0 },
  { id: 6, title: 'The Pragmatic Programmer', author: 'Andy Hunt', cat: 'Teknologi', color: '#d97706', emoji: '⚙️', available: false, rating: 4.7, total: 1, borrowed: 1 },
]

export default function LibraryDemo() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('Semua')
  const [borrowed, setBorrowed] = useState({})
  const [modal, setModal] = useState(null)

  const filtered = BOOKS.filter(b => {
    const mc = activeCat === 'Semua' || b.cat === activeCat
    const ms = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase())
    return mc && ms
  })

  const handleBorrow = (book) => {
    if (!book.available || borrowed[book.id]) return
    setModal(book)
  }
  const confirmBorrow = () => {
    setBorrowed(p => ({ ...p, [modal.id]: true }))
    setModal(null)
  }

  return (
    <div css={page}>
      <nav css={nav}>
        <button css={backBtn} onClick={() => navigate('/')}><ArrowLeft size={16} /> Kembali</button>
        <div css={logo}>📚 LibraryMS</div>
        <div css={css`color:${accentLight};font-size:0.85rem;`}>Halo, Abdullah</div>
      </nav>

      <div css={hero}>
        <h1 css={heroTitle}>Perpustakaan <span style={{ color: accentLight }}>Digital</span></h1>
        <p css={heroSub}>Temukan dan pinjam buku favoritmu dari koleksi kami</p>
        <div css={searchBar}>
          <Search size={18} style={{ margin: 'auto 12px', color: '#92400e' }} />
          <input css={searchInput} placeholder="Cari judul atau penulis..." value={search} onChange={e => setSearch(e.target.value)} />
          <button css={searchBtnStyle}>Cari</button>
        </div>
      </div>

      <div css={statsRow}>
        <div css={statCard}><h3>1,240</h3><p>Total Buku</p></div>
        <div css={statCard}><h3>842</h3><p>Tersedia</p></div>
        <div css={statCard}><h3>398</h3><p>Dipinjam</p></div>
        <div css={statCard}><h3>2,100</h3><p>Anggota Aktif</p></div>
      </div>

      <div css={main}>
        <div css={sidebar}>
          <div css={sideTitle}><Filter size={14}/> Kategori</div>
          {CATEGORIES.map(c => <div key={c} css={catItem(activeCat === c)} onClick={() => setActiveCat(c)}>{c}</div>)}
        </div>

        <div css={booksGrid}>
          {filtered.map(book => (
            <div key={book.id} css={bookCard}>
              <div css={bookCover} style={{ background: book.color + '18' }}>{book.emoji}</div>
              <div css={bookBody}>
                <div css={starsRow}>{[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < Math.floor(book.rating) ? accentLight : 'none'} color={accentLight} />)}</div>
                <h3 css={bookTitle2}>{book.title}</h3>
                <p css={bookAuthor}>{book.author} • {book.cat}</p>
                <div css={bookMeta}>
                  <span css={availBadge(book.available && !borrowed[book.id])}>
                    {borrowed[book.id] ? '✓ Dipinjam' : book.available ? 'Tersedia' : 'Habis'}
                  </span>
                  <button css={borrowBtn(book.available && !borrowed[book.id])} onClick={() => handleBorrow(book)} disabled={!book.available || borrowed[book.id]}>
                    {borrowed[book.id] ? 'Terpinjam' : 'Pinjam'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div css={modalOverlay}>
          <div css={modalCard}>
            <div css={css`font-size:3rem;margin-bottom:12px;`}>{modal.emoji}</div>
            <h3 css={css`color:#fff;margin-bottom:8px;`}>{modal.title}</h3>
            <p css={css`color:#92400e;margin-bottom:20px;font-size:0.9rem;`}>Konfirmasi peminjaman selama 7 hari?</p>
            <div css={css`display:flex;gap:12px;justify-content:center;`}>
              <button css={css`padding:10px 24px;border-radius:10px;background:linear-gradient(135deg,${accent},${accentLight});color:#fff;border:none;font-weight:600;cursor:pointer;`} onClick={confirmBorrow}><CheckCircle size={16} style={{ marginRight: 6 }} />Konfirmasi</button>
              <button css={css`padding:10px 24px;border-radius:10px;background:rgba(100,100,100,0.2);color:#94a3b8;border:1px solid rgba(100,100,100,0.2);font-weight:600;cursor:pointer;`} onClick={() => setModal(null)}><X size={16} style={{ marginRight: 6 }} />Batal</button>
            </div>
          </div>
        </div>
      )}
      <div css={css`text-align:center;padding:24px;color:#64748b;font-size:0.8rem;border-top:1px solid rgba(217,119,6,0.08);`}>© 2026 LibraryMS — Demo oleh Abdullah Mirsab</div>
    </div>
  )
}
