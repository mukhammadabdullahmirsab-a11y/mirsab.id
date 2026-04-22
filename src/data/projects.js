import gotjobImg from '../assets/project-gotjob.svg'
import essImg from '../assets/project-ess.svg'

export const projects = [
  {
    id: 1,
    title: 'Job Seeker Portal',
    description:
      'GOTjob.id merupakan platform pencari kerja yang dirancang untuk membantu para pencari kerja menemukan peluang karier yang sesuai dengan keahlian mereka.',
    image: gotjobImg,
    stats: ['700,000 +', '500 +', '1,500,000 +'],
    statLabels: ['Kandidat yang mendapat posisi', 'Perusahaan Terpercaya', 'Kandidat Aktif dan Berkembang'],
    liveUrl: '#',
    tags: ['React', 'Node.js', 'Firebase'],
  },
  {
    id: 2,
    title: 'Employee Self Service',
    description:
      'Employee Self Service merupakan platform absensi berbasis geolokasi yang memungkinkan karyawan melakukan check-in dengan mudah.',
    image: essImg,
    liveUrl: '#',
    tags: ['React', 'Tailwind', 'Firebase'],
  },
  {
    id: 3,
    title: 'Library Management System',
    description:
      'Sistem manajemen perpustakaan digital yang mengelola peminjaman, pengembalian, dan katalog buku secara efisien.',
    image: null,
    liveUrl: '#',
    tags: ['Laravel', 'Bootstrap', 'MySQL'],
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    description:
      'Platform e-commerce modern dengan fitur keranjang belanja, pembayaran, dan manajemen produk yang lengkap.',
    image: null,
    liveUrl: '#',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 5,
    title: 'Task Management App',
    description:
      'Aplikasi manajemen tugas dengan fitur drag-and-drop, kategori, dan notifikasi untuk meningkatkan produktivitas.',
    image: null,
    liveUrl: '#',
    tags: ['React', 'Firebase', 'MUI'],
  },
  {
    id: 6,
    title: 'Personal Blog',
    description:
      'Blog pribadi dengan CMS sederhana, fitur komentar, dan optimasi SEO untuk berbagi artikel teknologi.',
    image: null,
    liveUrl: '#',
    tags: ['Next.js', 'Tailwind', 'Vercel'],
  },
]
