/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css, keyframes } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Briefcase, Clock, ChevronRight, ArrowLeft, Star, Users, Building2, TrendingUp, Filter } from 'lucide-react'

const accent = '#2563eb'
const accentLight = '#3b82f6'
const accentBg = 'rgba(37, 99, 235, 0.1)'

const page = css`
  min-height: 100vh;
  background: #060918;
  color: #fff;
  font-family: 'Poppins', sans-serif;
`
const nav = css`
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 5%; border-bottom: 1px solid rgba(37,99,235,0.15);
  background: rgba(6,9,24,0.9); backdrop-filter: blur(12px);
  position: sticky; top: 0; z-index: 100;
`
const backBtn = css`
  display: inline-flex; align-items: center; gap: 6px;
  background: ${accentBg}; border: 1px solid rgba(37,99,235,0.3);
  color: ${accentLight}; padding: 8px 16px; border-radius: 8px;
  cursor: pointer; font-size: 0.85rem; font-weight: 600; transition: all 0.2s;
  &:hover { background: rgba(37,99,235,0.2); }
`
const logo = css`
  font-size: 1.4rem; font-weight: 800;
  background: linear-gradient(135deg, ${accent}, ${accentLight});
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`
const float = keyframes`
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`
const hero = css`
  text-align: center; padding: 80px 5% 60px;
  background: radial-gradient(ellipse at center top, rgba(37,99,235,0.12) 0%, transparent 60%);
`
const heroTitle = css`
  font-size: 3rem; font-weight: 800; margin-bottom: 16px; line-height: 1.2;
  @media(max-width:768px){ font-size: 2rem; }
`
const heroSub = css` color: #94a3b8; font-size: 1.1rem; margin-bottom: 32px; max-width: 600px; margin-left: auto; margin-right: auto; `

const searchBar = css`
  display: flex; max-width: 700px; margin: 0 auto 20px;
  background: rgba(15,20,40,0.8); border: 1px solid rgba(37,99,235,0.25);
  border-radius: 14px; overflow: hidden;
  @media(max-width:600px){ flex-direction: column; }
`
const searchInput = css`
  flex: 1; padding: 16px 20px; background: transparent; border: none;
  color: #fff; font-size: 0.95rem; outline: none;
  &::placeholder { color: #64748b; }
`
const searchBtn = css`
  padding: 16px 32px; background: linear-gradient(135deg, ${accent}, ${accentLight});
  color: #fff; border: none; font-weight: 600; cursor: pointer; font-size: 0.95rem;
  transition: all 0.2s; &:hover { filter: brightness(1.1); }
`

const statsRow = css`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
  max-width: 900px; margin: 0 auto 60px; padding: 0 5%;
  @media(max-width:768px){ grid-template-columns: 1fr; }
`
const statCard = css`
  background: rgba(15,20,40,0.7); border: 1px solid rgba(37,99,235,0.15);
  border-radius: 16px; padding: 24px; text-align: center;
  transition: all 0.3s;
  &:hover { border-color: rgba(37,99,235,0.4); transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(37,99,235,0.15); }
  h3 { font-size: 2rem; font-weight: 700; color: ${accentLight}; margin-bottom: 4px; }
  p { color: #94a3b8; font-size: 0.85rem; }
`

const section = css` max-width: 1100px; margin: 0 auto; padding: 0 5% 60px; `
const sectionTitle = css`
  font-size: 1.8rem; font-weight: 700; margin-bottom: 8px;
  background: linear-gradient(135deg, ${accent}, ${accentLight});
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`
const sectionSub = css` color: #94a3b8; margin-bottom: 30px; `

const filterRow = css`
  display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px;
`
const filterChip = (active) => css`
  padding: 8px 18px; border-radius: 50px; cursor: pointer; font-size: 0.85rem; font-weight: 500;
  border: 1px solid ${active ? accent : 'rgba(100,120,200,0.2)'};
  background: ${active ? accentBg : 'transparent'};
  color: ${active ? accentLight : '#94a3b8'};
  transition: all 0.2s;
  &:hover { border-color: ${accent}; color: ${accentLight}; }
`

const jobsGrid = css`
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
  @media(max-width:768px){ grid-template-columns: 1fr; }
`
const jobCard = css`
  background: rgba(15,20,40,0.7); border: 1px solid rgba(37,99,235,0.12);
  border-radius: 16px; padding: 24px; transition: all 0.3s;
  &:hover { border-color: rgba(37,99,235,0.35); transform: translateY(-3px);
    box-shadow: 0 6px 24px rgba(37,99,235,0.12); }
`
const jobTitle = css` font-size: 1.1rem; font-weight: 600; color: #fff; margin-bottom: 8px; `
const jobCompany = css` color: ${accentLight}; font-size: 0.9rem; font-weight: 500; margin-bottom: 12px; `
const jobMeta = css`
  display: flex; flex-wrap: wrap; gap: 16px; color: #64748b; font-size: 0.8rem; margin-bottom: 16px;
  span { display: flex; align-items: center; gap: 4px; }
`
const jobTags = css`
  display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;
  span { padding: 4px 10px; border-radius: 6px; background: rgba(37,99,235,0.1);
    color: #94a3b8; font-size: 0.75rem; }
`
const applyBtn = css`
  display: inline-flex; align-items: center; gap: 6px;
  padding: 10px 22px; border-radius: 10px;
  background: linear-gradient(135deg, ${accent}, ${accentLight});
  color: #fff; border: none; font-weight: 600; font-size: 0.85rem;
  cursor: pointer; transition: all 0.2s;
  &:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(37,99,235,0.4); }
`

const companiesSection = css`
  max-width: 1100px; margin: 0 auto; padding: 0 5% 80px;
`
const companiesGrid = css`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
  @media(max-width:768px){ grid-template-columns: repeat(2, 1fr); }
`
const companyCard = css`
  background: rgba(15,20,40,0.6); border: 1px solid rgba(37,99,235,0.1);
  border-radius: 14px; padding: 24px; text-align: center;
  transition: all 0.3s; animation: ${float} 6s ease-in-out infinite;
  &:nth-of-type(2) { animation-delay: 1s; }
  &:nth-of-type(3) { animation-delay: 2s; }
  &:nth-of-type(4) { animation-delay: 0.5s; }
  &:hover { border-color: rgba(37,99,235,0.3); }
  h4 { color: #fff; font-size: 1rem; margin-top: 12px; }
  p { color: #64748b; font-size: 0.8rem; }
`
const companyIcon = css`
  width: 50px; height: 50px; border-radius: 12px; margin: 0 auto;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; font-weight: 700;
`

const footer = css`
  text-align: center; padding: 30px 5%;
  border-top: 1px solid rgba(37,99,235,0.1); color: #64748b; font-size: 0.85rem;
`

const JOBS = [
  { id: 1, title: 'Frontend Developer', company: 'PT Teknologi Maju', loc: 'Jakarta', type: 'Full-time', salary: 'Rp 8-15 jt', tags: ['React', 'TypeScript', 'Tailwind'], posted: '2 hari lalu', cat: 'Tech' },
  { id: 2, title: 'UI/UX Designer', company: 'Kreasi Digital', loc: 'Bandung', type: 'Remote', salary: 'Rp 7-12 jt', tags: ['Figma', 'Adobe XD', 'Prototype'], posted: '5 hari lalu', cat: 'Design' },
  { id: 3, title: 'Backend Engineer', company: 'Solusi Data', loc: 'Surabaya', type: 'Full-time', salary: 'Rp 10-18 jt', tags: ['Node.js', 'PostgreSQL', 'Docker'], posted: '1 hari lalu', cat: 'Tech' },
  { id: 4, title: 'Marketing Manager', company: 'Brand Co.', loc: 'Jakarta', type: 'On-site', salary: 'Rp 12-20 jt', tags: ['SEO', 'Google Ads', 'Analytics'], posted: '3 hari lalu', cat: 'Marketing' },
  { id: 5, title: 'Data Analyst', company: 'Insight Labs', loc: 'Remote', type: 'Contract', salary: 'Rp 9-14 jt', tags: ['Python', 'SQL', 'Tableau'], posted: '1 hari lalu', cat: 'Tech' },
  { id: 6, title: 'Product Manager', company: 'AppWorks', loc: 'Yogyakarta', type: 'Full-time', salary: 'Rp 15-25 jt', tags: ['Agile', 'Jira', 'Strategy'], posted: '4 hari lalu', cat: 'Management' },
]
const COMPANIES = [
  { name: 'Teknologi Maju', jobs: '24 lowongan', color: '#2563eb', letter: 'T' },
  { name: 'Kreasi Digital', jobs: '12 lowongan', color: '#7c3aed', letter: 'K' },
  { name: 'Solusi Data', jobs: '18 lowongan', color: '#059669', letter: 'S' },
  { name: 'AppWorks', jobs: '9 lowongan', color: '#e11d48', letter: 'A' },
]
const CATEGORIES = ['Semua', 'Tech', 'Design', 'Marketing', 'Management']

export default function GotjobDemo() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('Semua')
  const [applied, setApplied] = useState({})

  const filteredJobs = JOBS.filter(j => {
    const matchCat = activeCat === 'Semua' || j.cat === activeCat
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div css={page}>
      <nav css={nav}>
        <button css={backBtn} onClick={() => navigate('/')}><ArrowLeft size={16} /> Kembali</button>
        <div css={logo}>GOTjob.id</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button css={css`${applyBtn}; padding: 8px 16px; font-size: 0.8rem;`}>Masuk</button>
        </div>
      </nav>

      <section css={hero}>
        <h1 css={heroTitle}>Temukan Karier <span style={{ color: accentLight }}>Impianmu</span></h1>
        <p css={heroSub}>Platform pencari kerja terpercaya dengan 500+ perusahaan dan ribuan peluang karier menanti Anda.</p>
        <div css={searchBar}>
          <div css={css`display:flex;align-items:center;padding-left:16px;color:#64748b;`}><Search size={18} /></div>
          <input css={searchInput} placeholder="Cari posisi, perusahaan, atau keahlian..." value={search} onChange={e => setSearch(e.target.value)} />
          <button css={searchBtn}><Search size={16} style={{ marginRight: 6 }} /> Cari</button>
        </div>
      </section>

      <div css={statsRow}>
        <div css={statCard}><h3>700,000+</h3><p>Kandidat Mendapat Posisi</p></div>
        <div css={statCard}><h3>500+</h3><p>Perusahaan Terpercaya</p></div>
        <div css={statCard}><h3>1,500,000+</h3><p>Kandidat Aktif</p></div>
      </div>

      <div css={section}>
        <h2 css={sectionTitle}>Lowongan Terbaru</h2>
        <p css={sectionSub}>Temukan pekerjaan yang sesuai dengan keahlian Anda</p>
        <div css={filterRow}>
          <span css={css`display:flex;align-items:center;gap:4px;color:#64748b;font-size:0.85rem;margin-right:8px;`}><Filter size={14} /> Filter:</span>
          {CATEGORIES.map(c => (
            <button key={c} css={filterChip(activeCat === c)} onClick={() => setActiveCat(c)}>{c}</button>
          ))}
        </div>
        <div css={jobsGrid}>
          {filteredJobs.map(job => (
            <div key={job.id} css={jobCard}>
              <h3 css={jobTitle}>{job.title}</h3>
              <p css={jobCompany}><Building2 size={14} style={{ marginRight: 4 }} /> {job.company}</p>
              <div css={jobMeta}>
                <span><MapPin size={13} /> {job.loc}</span>
                <span><Briefcase size={13} /> {job.type}</span>
                <span><Clock size={13} /> {job.posted}</span>
              </div>
              <div css={jobTags}>{job.tags.map(t => <span key={t}>{t}</span>)}</div>
              <div css={css`display:flex;justify-content:space-between;align-items:center;`}>
                <span css={css`color:${accentLight};font-weight:600;font-size:0.95rem;`}>{job.salary}</span>
                <button css={applyBtn} onClick={() => setApplied(p => ({...p, [job.id]: true}))} disabled={applied[job.id]}>
                  {applied[job.id] ? '✓ Dilamar' : 'Lamar'} <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div css={companiesSection}>
        <h2 css={sectionTitle}>Perusahaan Terpercaya</h2>
        <p css={sectionSub}>Bergabunglah dengan perusahaan terbaik di Indonesia</p>
        <div css={companiesGrid}>
          {COMPANIES.map(c => (
            <div key={c.name} css={companyCard}>
              <div css={companyIcon} style={{ background: c.color + '22', color: c.color }}>{c.letter}</div>
              <h4>{c.name}</h4>
              <p>{c.jobs}</p>
            </div>
          ))}
        </div>
      </div>

      <div css={footer}>
        <p>© 2026 GOTjob.id — Demo oleh Abdullah Mirsab</p>
      </div>
    </div>
  )
}
