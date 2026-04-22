/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import {
  Send,
  User,
  Mail as MailIcon,
  MessageSquare,
  Mail,
  UserCircle,
} from 'lucide-react'
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'

const contactSection = css`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 100px 5% 60px;
`

const container = css`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`

const sectionHeader = css`
  text-align: center;
  margin-bottom: 50px;
`

const sectionTitle = css`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

const sectionSubtitle = css`
  color: #9ca3af;
  font-size: 1rem;
`

const contactGrid = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

/* ============ CONTACT FORM ============ */
const formCard = css`
  background: rgba(20, 20, 50, 0.4);
  border: 1px solid rgba(100, 100, 200, 0.1);
  border-radius: 20px;
  padding: 32px;
  backdrop-filter: blur(10px);
`

const formTitle = css`
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 24px;
`

const inputGroup = css`
  position: relative;
  margin-bottom: 18px;
`

const inputIcon = css`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
`

const textareaIcon = css`
  position: absolute;
  left: 16px;
  top: 18px;
  color: #6b7280;
  pointer-events: none;
`

const inputStyle = css`
  width: 100%;
  padding: 14px 16px 14px 48px;
  background: rgba(20, 20, 50, 0.6);
  border: 1px solid rgba(100, 100, 200, 0.15);
  border-radius: 12px;
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
  }
`

const textareaStyle = css`
  ${inputStyle};
  min-height: 140px;
  resize: vertical;
`

const submitBtn = css`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #7c3aed, #c084fc);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  margin-top: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`

/* ============ CONNECT WITH ME ============ */
const connectSection = css`
  margin-top: 32px;
  padding: 24px;
  background: rgba(20, 20, 50, 0.4);
  border: 1px solid rgba(100, 100, 200, 0.1);
  border-radius: 16px;
`

const connectTitle = css`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 18px;

  &::before {
    content: '';
    display: block;
    width: 28px;
    height: 3px;
    background: linear-gradient(135deg, #7c3aed, #a855f7);
    border-radius: 2px;
  }
`

const connectGrid = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const connectCard = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: rgba(20, 20, 50, 0.5);
  border: 1px solid rgba(100, 100, 200, 0.1);
  border-radius: 12px;
  color: #9ca3af;
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(124, 58, 237, 0.3);
    background: rgba(124, 58, 237, 0.08);
    color: #c084fc;
    transform: translateX(4px);
  }

  svg {
    flex-shrink: 0;
  }
`

/* ============ COMMENTS SECTION ============ */
const commentsCard = css`
  background: rgba(20, 20, 50, 0.4);
  border: 1px solid rgba(100, 100, 200, 0.1);
  border-radius: 20px;
  padding: 32px;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
`

const commentsTitle = css`
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 24px;
`

const commentInputGroup = css`
  margin-bottom: 14px;
`

const commentInput = css`
  width: 100%;
  padding: 14px 16px;
  background: rgba(20, 20, 50, 0.6);
  border: 1px solid rgba(100, 100, 200, 0.15);
  border-radius: 12px;
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
  }
`

const commentLabel = css`
  display: block;
  color: #d1d5db;
  font-size: 0.9rem;
  margin-bottom: 6px;
  font-weight: 500;

  span {
    color: #ef4444;
  }
`

const commentTextarea = css`
  ${commentInput};
  min-height: 100px;
  resize: vertical;
`

const postBtn = css`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #7c3aed, #c084fc);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  margin-top: 8px;
  margin-bottom: 24px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
  }
`

const commentList = css`
  flex: 1;
  overflow-y: auto;
  max-height: 350px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(124, 58, 237, 0.3);
    border-radius: 2px;
  }
`

const commentItem = css`
  padding: 16px;
  background: rgba(20, 20, 50, 0.5);
  border: 1px solid rgba(100, 100, 200, 0.08);
  border-radius: 12px;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(124, 58, 237, 0.2);
  }
`

const commentHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`

const commentAuthor = css`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #ffffff;
  font-size: 0.95rem;
`

const commentAvatar = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(168, 85, 247, 0.15));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c084fc;
`

const commentDate = css`
  color: #6b7280;
  font-size: 0.75rem;
`

const commentText = css`
  color: #9ca3af;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-left: 42px;
`

// Seed comments
const SEED_COMMENTS = [
  { id: 1, name: 'anonym', message: 'hai', date: 'Feb 21, 2026' },
  { id: 2, name: 'Cek', message: 'Keren banget websitenya!', date: 'May 26, 2025' },
  { id: 3, name: 'Aditya Agusti', message: 'Mantap portofolionya!', date: 'Feb 28, 2025' },
]

export default function Contact() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [commentForm, setCommentForm] = useState({ name: '', message: '' })
  const [comments, setComments] = useState([])
  const [contactSent, setContactSent] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('portfolio_comments')
    if (stored) {
      setComments(JSON.parse(stored))
    } else {
      setComments(SEED_COMMENTS)
      localStorage.setItem('portfolio_comments', JSON.stringify(SEED_COMMENTS))
    }
  }, [])

  const handleContactSubmit = (e) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.email || !contactForm.message) return

    // In production, send via email API
    console.log('Contact form submitted:', contactForm)
    setContactSent(true)
    setContactForm({ name: '', email: '', message: '' })
    setTimeout(() => setContactSent(false), 3000)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!commentForm.message.trim()) return

    const newComment = {
      id: Date.now(),
      name: commentForm.name.trim() || 'anonym',
      message: commentForm.message.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    }

    const updated = [newComment, ...comments]
    setComments(updated)
    localStorage.setItem('portfolio_comments', JSON.stringify(updated))
    setCommentForm({ name: '', message: '' })
  }

  return (
    <section id="contact" css={contactSection}>
      <div css={container}>
        <div css={sectionHeader} data-aos="fade-up">
          <h2 css={sectionTitle}>Get In Touch</h2>
          <p css={sectionSubtitle}>
            Feel free to reach out for collaboration or just a friendly hello!
          </p>
        </div>

        <div css={contactGrid}>
          {/* LEFT — Contact Form + Connect */}
          <div>
            <motion.div
              css={formCard}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 css={formTitle}>Send Message</h3>
              <form onSubmit={handleContactSubmit}>
                <div css={inputGroup}>
                  <User size={18} css={inputIcon} />
                  <input
                    css={inputStyle}
                    type="text"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                </div>
                <div css={inputGroup}>
                  <MailIcon size={18} css={inputIcon} />
                  <input
                    css={inputStyle}
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                </div>
                <div css={inputGroup}>
                  <MessageSquare size={18} css={textareaIcon} />
                  <textarea
                    css={textareaStyle}
                    placeholder="Your Message"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((p) => ({ ...p, message: e.target.value }))
                    }
                  />
                </div>
                <button type="submit" css={submitBtn}>
                  <Send size={18} />
                  {contactSent ? 'Message Sent!' : 'Send Message'}
                </button>
              </form>
            </motion.div>

            <motion.div
              css={connectSection}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 css={connectTitle}>Connect With Me</h4>
              <div css={connectGrid}>
                <a
                  href="https://github.com/mukhammadabdullahmirsab-a11y/"
                  target="_blank"
                  rel="noopener noreferrer"
                  css={connectCard}
                >
                  <FiGithub size={20} />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  css={connectCard}
                >
                  <FiLinkedin size={20} />
                  LinkedIn
                </a>
                <a
                  href="https://instagram.com/abmrs_rius"
                  target="_blank"
                  rel="noopener noreferrer"
                  css={connectCard}
                >
                  <FiInstagram size={20} />
                  @abmrs_rius
                </a>
                <a
                  href="mailto:mukhammadabdullahmirsab@gmail.com"
                  css={connectCard}
                >
                  <Mail size={20} />
                  Email
                </a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Comments */}
          <motion.div
            css={commentsCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 css={commentsTitle}>💬 Leave a Comment</h3>

            <form onSubmit={handleCommentSubmit}>
              <div css={commentInputGroup}>
                <input
                  css={commentInput}
                  type="text"
                  placeholder="Enter your name"
                  value={commentForm.name}
                  onChange={(e) =>
                    setCommentForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div css={commentInputGroup}>
                <label css={commentLabel}>
                  Message <span>*</span>
                </label>
                <textarea
                  css={commentTextarea}
                  placeholder="Write your message here..."
                  value={commentForm.message}
                  onChange={(e) =>
                    setCommentForm((p) => ({ ...p, message: e.target.value }))
                  }
                  required
                />
              </div>
              <button type="submit" css={postBtn}>
                <Send size={16} />
                Post Comment
              </button>
            </form>

            {/* Comment List */}
            <div css={commentList}>
              {comments.map((comment) => (
                <div key={comment.id} css={commentItem}>
                  <div css={commentHeader}>
                    <div css={commentAuthor}>
                      <div css={commentAvatar}>
                        <UserCircle size={18} />
                      </div>
                      {comment.name}
                    </div>
                    <span css={commentDate}>{comment.date}</span>
                  </div>
                  <p css={commentText}>{comment.message}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
