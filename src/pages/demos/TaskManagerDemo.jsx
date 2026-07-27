/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, X, CheckSquare, Square, AlertCircle, Clock, CheckCircle2, Flame } from 'lucide-react'

const accent = '#4f46e5'
const accentLight = '#818cf8'
const page = css`min-height:100vh;background:#07080f;color:#fff;font-family:'Poppins',sans-serif;`
const nav = css`display:flex;align-items:center;justify-content:space-between;padding:16px 5%;border-bottom:1px solid rgba(79,70,229,0.15);background:rgba(7,8,15,0.9);backdrop-filter:blur(12px);position:sticky;top:0;z-index:100;`
const backBtn = css`display:inline-flex;align-items:center;gap:6px;background:rgba(79,70,229,0.1);border:1px solid rgba(79,70,229,0.3);color:${accentLight};padding:8px 16px;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;transition:all 0.2s;&:hover{background:rgba(79,70,229,0.2);}`
const logo = css`font-size:1.4rem;font-weight:800;background:linear-gradient(135deg,${accent},${accentLight});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;`

const layout = css`max-width:1200px;margin:0 auto;padding:32px 5%;`
const pageTitle = css`font-size:2rem;font-weight:700;margin-bottom:6px;`
const pageSub = css`color:#64748b;margin-bottom:28px;`

const statsRow = css`display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px;@media(max-width:768px){grid-template-columns:repeat(2,1fr);}`
const statCard = css`background:rgba(15,18,35,0.8);border:1px solid rgba(79,70,229,0.15);border-radius:14px;padding:18px;`
const statNum = css`font-size:1.8rem;font-weight:700;`
const statLabel = css`color:#64748b;font-size:0.8rem;`

const boardGrid = css`display:grid;grid-template-columns:repeat(3,1fr);gap:20px;@media(max-width:900px){grid-template-columns:1fr;}`
const column = (color) => css`background:rgba(15,18,35,0.7);border:1px solid ${color}22;border-radius:16px;padding:18px;min-height:300px;`
const colHeader = css`display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;font-weight:600;font-size:0.95rem;`
const colCount = (color) => css`background:${color}22;color:${color};font-size:0.75rem;font-weight:700;padding:3px 10px;border-radius:20px;`

const taskCard = css`background:rgba(30,30,60,0.6);border:1px solid rgba(79,70,229,0.1);border-radius:12px;padding:14px;margin-bottom:10px;cursor:pointer;transition:all 0.2s;&:hover{border-color:rgba(79,70,229,0.3);transform:translateY(-2px);box-shadow:0 4px 16px rgba(79,70,229,0.1);}`
const taskTitle = css`font-size:0.9rem;font-weight:600;color:#fff;margin-bottom:6px;`
const taskDesc = css`font-size:0.78rem;color:#64748b;margin-bottom:10px;line-height:1.4;`
const taskFooter = css`display:flex;justify-content:space-between;align-items:center;`
const prioBadge = (p) => {
  const map = { high: ['#ef4444','rgba(239,68,68,0.12)'], medium: ['#f59e0b','rgba(245,158,11,0.12)'], low: ['#10b981','rgba(16,185,129,0.12)'] }
  const [c,bg] = map[p] || ['#6b7280','#1f2937']
  return css`font-size:0.7rem;font-weight:600;padding:3px 8px;border-radius:5px;color:${c};background:${bg};`
}
const dueDateStyle = css`font-size:0.75rem;color:#64748b;display:flex;align-items:center;gap:4px;`

const addForm = css`background:rgba(79,70,229,0.06);border:1px solid rgba(79,70,229,0.15);border-radius:14px;padding:20px;margin-bottom:24px;`
const formTitle = css`font-weight:600;color:${accentLight};margin-bottom:14px;display:flex;align-items:center;gap:6px;font-size:0.9rem;`
const inputStyle = css`width:100%;padding:10px 14px;background:rgba(15,18,35,0.8);border:1px solid rgba(79,70,229,0.2);border-radius:8px;color:#fff;font-size:0.9rem;outline:none;margin-bottom:10px;&::placeholder{color:#374151;}`
const addTaskBtn = css`padding:10px 24px;border-radius:10px;background:linear-gradient(135deg,${accent},${accentLight});color:#fff;border:none;font-weight:600;font-size:0.85rem;cursor:pointer;display:flex;align-items:center;gap:6px;&:hover{filter:brightness(1.1);}`

const INIT_TASKS = {
  todo: [
    { id: 1, title: 'Redesain Halaman Login', desc: 'Update UI login dengan desain terbaru', prio: 'high', due: 'Jul 30' },
    { id: 2, title: 'Integrasi API Pembayaran', desc: 'Hubungkan dengan midtrans gateway', prio: 'medium', due: 'Agu 2' },
    { id: 3, title: 'Dokumentasi API', desc: 'Tulis swagger docs untuk semua endpoint', prio: 'low', due: 'Agu 5' },
  ],
  inprogress: [
    { id: 4, title: 'Fitur Notifikasi Push', desc: 'Implementasi Firebase Cloud Messaging', prio: 'high', due: 'Jul 28' },
    { id: 5, title: 'Optimasi Performa DB', desc: 'Indexing & query optimization', prio: 'medium', due: 'Jul 29' },
  ],
  done: [
    { id: 6, title: 'Setup CI/CD Pipeline', desc: 'GitHub Actions untuk auto-deploy', prio: 'high', due: 'Jul 20' },
    { id: 7, title: 'Unit Testing Auth Module', desc: 'Coverage 80%+ untuk auth logic', prio: 'medium', due: 'Jul 22' },
  ]
}

const COLS = [
  { key: 'todo', label: '📋 To Do', color: '#64748b', icon: <Square size={16}/> },
  { key: 'inprogress', label: '⚡ In Progress', color: '#f59e0b', icon: <Clock size={16}/> },
  { key: 'done', label: '✅ Done', color: '#10b981', icon: <CheckCircle2 size={16}/> },
]

export default function TaskManagerDemo() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState(INIT_TASKS)
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newPrio, setNewPrio] = useState('medium')

  const addTask = () => {
    if (!newTitle.trim()) return
    const newTask = { id: Date.now(), title: newTitle, desc: newDesc || 'Tidak ada deskripsi.', prio: newPrio, due: 'Jul 31' }
    setTasks(p => ({ ...p, todo: [newTask, ...p.todo] }))
    setNewTitle(''); setNewDesc('')
  }
  const moveTask = (taskId, fromCol, toCol) => {
    const task = tasks[fromCol].find(t => t.id === taskId)
    setTasks(p => ({
      ...p,
      [fromCol]: p[fromCol].filter(t => t.id !== taskId),
      [toCol]: [task, ...p[toCol]]
    }))
  }
  const removeTask = (taskId, col) => setTasks(p => ({ ...p, [col]: p[col].filter(t => t.id !== taskId) }))

  const totalDone = tasks.done.length
  const totalAll = Object.values(tasks).flat().length

  return (
    <div css={page}>
      <nav css={nav}>
        <button css={backBtn} onClick={() => navigate('/')}><ArrowLeft size={16}/> Kembali</button>
        <div css={logo}>TaskFlow</div>
        <div css={css`color:${accentLight};font-size:0.85rem;font-weight:600;`}>✓ {totalDone}/{totalAll} Done</div>
      </nav>

      <div css={layout}>
        <h1 css={pageTitle}>Papan Tugas</h1>
        <p css={pageSub}>Kelola dan pantau progres semua tugas Anda</p>

        <div css={statsRow}>
          <div css={statCard}><div css={css`${statNum};color:#64748b;`}>{tasks.todo.length}</div><div css={statLabel}>To Do</div></div>
          <div css={statCard}><div css={css`${statNum};color:#f59e0b;`}>{tasks.inprogress.length}</div><div css={statLabel}>In Progress</div></div>
          <div css={statCard}><div css={css`${statNum};color:#10b981;`}>{tasks.done.length}</div><div css={statLabel}>Selesai</div></div>
          <div css={statCard}><div css={css`${statNum};color:${accentLight};`}>{Math.round(totalDone/totalAll*100)}%</div><div css={statLabel}>Progres</div></div>
        </div>

        <div css={addForm}>
          <div css={formTitle}><Plus size={16}/> Tambah Tugas Baru</div>
          <input css={inputStyle} placeholder="Judul tugas..." value={newTitle} onChange={e => setNewTitle(e.target.value)} />
          <input css={inputStyle} placeholder="Deskripsi (opsional)..." value={newDesc} onChange={e => setNewDesc(e.target.value)} />
          <div css={css`display:flex;gap:12px;align-items:center;flex-wrap:wrap;`}>
            <select css={css`${inputStyle};margin:0;width:auto;padding:10px 16px;`} value={newPrio} onChange={e => setNewPrio(e.target.value)}>
              <option value="high">🔴 Prioritas Tinggi</option>
              <option value="medium">🟡 Prioritas Sedang</option>
              <option value="low">🟢 Prioritas Rendah</option>
            </select>
            <button css={addTaskBtn} onClick={addTask}><Plus size={16}/> Tambah</button>
          </div>
        </div>

        <div css={boardGrid}>
          {COLS.map(col => (
            <div key={col.key} css={column(col.color)}>
              <div css={colHeader}>
                <span style={{ color: col.color }}>{col.label}</span>
                <span css={colCount(col.color)}>{tasks[col.key].length}</span>
              </div>
              {tasks[col.key].map(task => (
                <div key={task.id} css={taskCard}>
                  <div css={taskTitle}>{task.title}</div>
                  <div css={taskDesc}>{task.desc}</div>
                  <div css={taskFooter}>
                    <span css={prioBadge(task.prio)}>{task.prio === 'high' ? '🔴 Tinggi' : task.prio === 'medium' ? '🟡 Sedang' : '🟢 Rendah'}</span>
                    <span css={dueDateStyle}><Clock size={11}/>{task.due}</span>
                  </div>
                  <div css={css`display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;`}>
                    {col.key !== 'inprogress' && col.key !== 'done' && <button css={css`font-size:0.7rem;padding:4px 10px;border-radius:6px;background:rgba(245,158,11,0.12);color:#f59e0b;border:none;cursor:pointer;`} onClick={() => moveTask(task.id, col.key, 'inprogress')}>→ Progress</button>}
                    {col.key === 'inprogress' && <button css={css`font-size:0.7rem;padding:4px 10px;border-radius:6px;background:rgba(16,185,129,0.12);color:#10b981;border:none;cursor:pointer;`} onClick={() => moveTask(task.id, col.key, 'done')}>✓ Selesai</button>}
                    {col.key === 'inprogress' && <button css={css`font-size:0.7rem;padding:4px 10px;border-radius:6px;background:rgba(100,116,139,0.12);color:#94a3b8;border:none;cursor:pointer;`} onClick={() => moveTask(task.id, col.key, 'todo')}>← Kembali</button>}
                    <button css={css`font-size:0.7rem;padding:4px 10px;border-radius:6px;background:rgba(239,68,68,0.1);color:#f87171;border:none;cursor:pointer;margin-left:auto;`} onClick={() => removeTask(task.id, col.key)}><X size={12}/></button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div css={css`text-align:center;padding:24px;color:#374151;font-size:0.8rem;border-top:1px solid rgba(79,70,229,0.08);`}>© 2026 TaskFlow — Demo oleh Abdullah Mirsab</div>
    </div>
  )
}
