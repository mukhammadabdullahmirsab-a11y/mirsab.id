/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, CheckCircle, XCircle, AlertCircle, User, Calendar } from 'lucide-react'

const accent = '#059669'
const accentLight = '#10b981'
const page = css`min-height:100vh;background:#030f0a;color:#fff;font-family:'Poppins',sans-serif;`
const nav = css`display:flex;align-items:center;justify-content:space-between;padding:16px 5%;border-bottom:1px solid rgba(5,150,105,0.15);background:rgba(3,15,10,0.9);backdrop-filter:blur(12px);position:sticky;top:0;z-index:100;`
const backBtn = css`display:inline-flex;align-items:center;gap:6px;background:rgba(5,150,105,0.1);border:1px solid rgba(5,150,105,0.3);color:${accentLight};padding:8px 16px;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;transition:all 0.2s;&:hover{background:rgba(5,150,105,0.2);}`
const logo = css`font-size:1.4rem;font-weight:800;background:linear-gradient(135deg,${accent},${accentLight});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;`

const dashGrid = css`max-width:1100px;margin:0 auto;padding:40px 5%;display:grid;grid-template-columns:300px 1fr;gap:28px;@media(max-width:900px){grid-template-columns:1fr;}`

const profileCard = css`background:rgba(5,150,105,0.07);border:1px solid rgba(5,150,105,0.15);border-radius:20px;padding:28px;text-align:center;`
const avatar = css`width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,${accent},${accentLight});margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;`
const profileName = css`font-size:1.2rem;font-weight:700;color:#fff;margin-bottom:4px;`
const profileRole = css`color:#6ee7b7;font-size:0.85rem;margin-bottom:20px;`
const profileStat = css`display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;`
const pStat = css`background:rgba(5,150,105,0.1);border-radius:10px;padding:12px;text-align:center;h4{font-size:1.3rem;font-weight:700;color:${accentLight};}p{color:#94a3b8;font-size:0.75rem;}`

const clockCard = css`background:rgba(5,150,105,0.07);border:1px solid rgba(5,150,105,0.15);border-radius:20px;padding:28px;margin-bottom:20px;text-align:center;`
const clockTime = css`font-size:3.5rem;font-weight:700;color:${accentLight};font-variant-numeric:tabular-nums;letter-spacing:2px;`
const clockDate = css`color:#94a3b8;margin-bottom:24px;`
const btnRow = css`display:flex;gap:16px;justify-content:center;flex-wrap:wrap;`
const checkBtn = (color, bg) => css`padding:14px 32px;border-radius:12px;background:${bg};border:1px solid ${color};color:${color};font-weight:600;font-size:1rem;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:8px;&:hover{background:${color}22;transform:translateY(-2px);}&:disabled{opacity:0.4;cursor:not-allowed;}`

const statusBadge = (status) => {
  const map = { hadir: ['#10b981','rgba(5,150,105,0.15)'], terlambat: ['#f59e0b','rgba(245,158,11,0.15)'], izin: ['#64748b','rgba(100,116,139,0.15)'] }
  const [c, bg] = map[status] || ['#6b7280','#1f2937']
  return css`padding:4px 12px;border-radius:6px;font-size:0.75rem;font-weight:600;color:${c};background:${bg};`
}

const mainCard = css`background:rgba(5,150,105,0.07);border:1px solid rgba(5,150,105,0.12);border-radius:20px;padding:24px;`
const tableStyle = css`width:100%;border-collapse:collapse;th{padding:12px 16px;text-align:left;color:#6ee7b7;font-size:0.8rem;font-weight:600;border-bottom:1px solid rgba(5,150,105,0.1);}td{padding:14px 16px;border-bottom:1px solid rgba(5,150,105,0.07);color:#d1fae5;font-size:0.9rem;}`

const locCard = css`background:rgba(5,150,105,0.07);border:1px solid rgba(5,150,105,0.12);border-radius:20px;padding:24px;margin-top:20px;`
const mapPlaceholder = css`background:rgba(5,150,105,0.05);border:1px dashed rgba(5,150,105,0.2);border-radius:14px;height:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#6ee7b7;gap:8px;`

const HISTORY = [
  { date: '2026-07-27', masuk: '08:02', keluar: '17:05', status: 'hadir', lokasi: 'Kantor Pusat' },
  { date: '2026-07-26', masuk: '08:45', keluar: '17:00', status: 'terlambat', lokasi: 'Kantor Pusat' },
  { date: '2026-07-25', masuk: '07:58', keluar: '17:01', status: 'hadir', lokasi: 'Remote' },
  { date: '2026-07-24', masuk: '-', keluar: '-', status: 'izin', lokasi: '-' },
  { date: '2026-07-23', masuk: '08:00', keluar: '17:00', status: 'hadir', lokasi: 'Kantor Pusat' },
]

export default function EssDemo() {
  const navigate = useNavigate()
  const [now, setNow] = useState(new Date())
  const [checkedIn, setCheckedIn] = useState(false)
  const [checkedOut, setCheckedOut] = useState(false)
  const [checkInTime, setCheckInTime] = useState('')
  const [checkOutTime, setCheckOutTime] = useState('')
  const [locStatus, setLocStatus] = useState('Mendeteksi lokasi...')

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    const geoTimer = setTimeout(() => setLocStatus('📍 Kantor Pusat — Jakarta Selatan (Terverifikasi)'), 1500)
    return () => { clearInterval(timer); clearTimeout(geoTimer) }
  }, [])

  const pad = n => String(n).padStart(2, '0')
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const doCheckIn = () => {
    setCheckedIn(true)
    setCheckInTime(`${pad(now.getHours())}:${pad(now.getMinutes())}`)
  }
  const doCheckOut = () => {
    setCheckedOut(true)
    setCheckOutTime(`${pad(now.getHours())}:${pad(now.getMinutes())}`)
  }

  return (
    <div css={page}>
      <nav css={nav}>
        <button css={backBtn} onClick={() => navigate('/')}><ArrowLeft size={16} /> Kembali</button>
        <div css={logo}>ESS App</div>
        <div css={css`display:flex;align-items:center;gap:8px;color:#6ee7b7;font-size:0.85rem;`}><User size={16}/> Abdullah Mirsab</div>
      </nav>

      <div css={dashGrid}>
        {/* Sidebar */}
        <div>
          <div css={profileCard}>
            <div css={avatar}>A</div>
            <div css={profileName}>Abdullah Mirsab</div>
            <div css={profileRole}>Frontend Developer • IT Dept</div>
            <div css={profileStat}>
              <div css={pStat}><h4>18</h4><p>Hari Hadir</p></div>
              <div css={pStat}><h4>1</h4><p>Terlambat</p></div>
              <div css={pStat}><h4>2</h4><p>Izin/Cuti</p></div>
              <div css={pStat}><h4>95%</h4><p>Kehadiran</p></div>
            </div>
            <div css={css`background:rgba(5,150,105,0.08);border-radius:10px;padding:12px;`}>
              {checkedIn ? (
                <div>
                  <div css={css`color:${accentLight};font-size:0.8rem;margin-bottom:4px;`}>✓ Check-in: {checkInTime}</div>
                  {checkedOut && <div css={css`color:#6ee7b7;font-size:0.8rem;`}>✓ Check-out: {checkOutTime}</div>}
                </div>
              ) : (
                <div css={css`color:#64748b;font-size:0.8rem;`}>Belum absen hari ini</div>
              )}
            </div>
          </div>
        </div>

        {/* Main */}
        <div>
          <div css={clockCard}>
            <div css={clockTime}>{timeStr}</div>
            <div css={clockDate}>{dateStr}</div>
            <div css={btnRow}>
              <button css={checkBtn('#10b981', 'rgba(16,185,129,0.1)')} onClick={doCheckIn} disabled={checkedIn}>
                <CheckCircle size={20} /> {checkedIn ? `Check-in ✓ ${checkInTime}` : 'Check-in'}
              </button>
              <button css={checkBtn('#f87171', 'rgba(248,113,113,0.1)')} onClick={doCheckOut} disabled={!checkedIn || checkedOut}>
                <XCircle size={20} /> {checkedOut ? `Check-out ✓ ${checkOutTime}` : 'Check-out'}
              </button>
            </div>
          </div>

          <div css={locCard}>
            <div css={css`display:flex;align-items:center;gap:8px;color:${accentLight};font-weight:600;margin-bottom:14px;`}><MapPin size={16}/> Status Lokasi</div>
            <div css={mapPlaceholder}>
              <MapPin size={28} />
              <span css={css`font-size:0.85rem;text-align:center;`}>{locStatus}</span>
            </div>
          </div>

          <div css={css`${mainCard};margin-top:20px;`}>
            <div css={css`display:flex;align-items:center;gap:8px;color:${accentLight};font-weight:600;margin-bottom:16px;`}><Calendar size={16}/> Riwayat Absensi</div>
            <table css={tableStyle}>
              <thead><tr><th>Tanggal</th><th>Masuk</th><th>Keluar</th><th>Status</th><th>Lokasi</th></tr></thead>
              <tbody>
                {HISTORY.map((h, i) => (
                  <tr key={i}>
                    <td>{h.date}</td>
                    <td>{h.masuk}</td>
                    <td>{h.keluar}</td>
                    <td><span css={statusBadge(h.status)}>{h.status}</span></td>
                    <td css={css`color:#94a3b8;`}>{h.lokasi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
