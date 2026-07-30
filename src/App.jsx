/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SplashScreen from './components/SplashScreen'
import ProjectDetail from './pages/ProjectDetail'
import GotjobDemo from './pages/demos/GotjobDemo'
import EssDemo from './pages/demos/EssDemo'
import LibraryDemo from './pages/demos/LibraryDemo'
import EcommerceDemo from './pages/demos/EcommerceDemo'
import TaskManagerDemo from './pages/demos/TaskManagerDemo'
import BlogDemo from './pages/demos/BlogDemo'

const appStyle = css`
  position: relative;
  min-height: 100vh;
`

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <div css={appStyle}>
      {showSplash && <SplashScreen finishLoading={() => setShowSplash(false)} />}
      
      {/* Background Effects */}
      <div className="bg-grid" />
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/demo/gotjob" element={<GotjobDemo />} />
        <Route path="/demo/ess" element={<EssDemo />} />
        <Route path="/demo/library" element={<LibraryDemo />} />
        <Route path="/demo/ecommerce" element={<EcommerceDemo />} />
        <Route path="/demo/taskmanager" element={<TaskManagerDemo />} />
        <Route path="/demo/blog" element={<BlogDemo />} />
      </Routes>
    </div>
  )
}
