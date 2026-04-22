/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'

const appStyle = css`
  position: relative;
  min-height: 100vh;
`

export default function App() {
  return (
    <div css={appStyle}>
      {/* Background Effects */}
      <div className="bg-grid" />
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <Hero />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  )
}
