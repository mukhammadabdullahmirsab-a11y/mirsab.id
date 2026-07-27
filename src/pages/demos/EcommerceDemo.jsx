/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Star, Plus, Minus, Trash2, Search, Heart, X, Tag } from 'lucide-react'

const accent = '#e11d48'
const accentLight = '#f43f5e'
const page = css`min-height:100vh;background:#0f0008;color:#fff;font-family:'Poppins',sans-serif;`
const nav = css`display:flex;align-items:center;justify-content:space-between;padding:16px 5%;border-bottom:1px solid rgba(225,29,72,0.15);background:rgba(15,0,8,0.9);backdrop-filter:blur(12px);position:sticky;top:0;z-index:100;`
const backBtn = css`display:inline-flex;align-items:center;gap:6px;background:rgba(225,29,72,0.1);border:1px solid rgba(225,29,72,0.3);color:${accentLight};padding:8px 16px;border-radius:8px;cursor:pointer;font-size:0.85rem;font-weight:600;transition:all 0.2s;&:hover{background:rgba(225,29,72,0.2);}`
const logo = css`font-size:1.4rem;font-weight:800;background:linear-gradient(135deg,${accent},${accentLight});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;`
const cartBtn = css`position:relative;display:flex;align-items:center;gap:6px;background:rgba(225,29,72,0.1);border:1px solid rgba(225,29,72,0.3);color:${accentLight};padding:8px 16px;border-radius:8px;cursor:pointer;font-weight:600;font-size:0.85rem;`
const cartBadge = css`position:absolute;-top:6px;-right:6px;top:-6px;right:-6px;background:${accent};color:#fff;border-radius:50%;width:18px;height:18px;font-size:0.65rem;display:flex;align-items:center;justify-content:center;font-weight:700;`

const heroBanner = css`background:radial-gradient(ellipse at 60% 50%,rgba(225,29,72,0.15) 0%,transparent 65%);padding:60px 5%;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;@media(max-width:768px){grid-template-columns:1fr;text-align:center;}`
const heroTitle = css`font-size:3rem;font-weight:800;line-height:1.2;margin-bottom:14px;@media(max-width:768px){font-size:2rem;}`
const heroSub = css`color:#fda4af;margin-bottom:24px;`
const shopNowBtn = css`padding:14px 32px;border-radius:12px;background:linear-gradient(135deg,${accent},${accentLight});color:#fff;border:none;font-weight:600;font-size:1rem;cursor:pointer;transition:all 0.2s;&:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(225,29,72,0.4);}`
const heroBig = css`font-size:6rem;text-align:center;animation:float 4s ease-in-out infinite;@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}`

const filterBar = css`display:flex;gap:10px;flex-wrap:wrap;max-width:1100px;margin:0 auto;padding:28px 5% 0;`
const filterChip = (a) => css`padding:8px 18px;border-radius:50px;cursor:pointer;font-size:0.85rem;font-weight:500;border:1px solid ${a?accent:'rgba(225,29,72,0.15)'};background:${a?'rgba(225,29,72,0.1)':'transparent'};color:${a?accentLight:'#94a3b8'};transition:all 0.2s;&:hover{border-color:${accent};color:${accentLight};}`

const productsGrid = css`display:grid;grid-template-columns:repeat(4,1fr);gap:20px;max-width:1100px;margin:20px auto;padding:0 5% 60px;@media(max-width:1000px){grid-template-columns:repeat(2,1fr);}@media(max-width:580px){grid-template-columns:1fr;}`
const productCard = css`background:rgba(30,5,15,0.7);border:1px solid rgba(225,29,72,0.1);border-radius:16px;overflow:hidden;transition:all 0.3s;&:hover{border-color:rgba(225,29,72,0.3);transform:translateY(-4px);box-shadow:0 8px 24px rgba(225,29,72,0.12);}`
const productImg = css`height:160px;display:flex;align-items:center;justify-content:center;font-size:4rem;`
const productBody = css`padding:16px;`
const productName = css`font-size:0.95rem;font-weight:600;color:#fff;margin-bottom:4px;`
const productPrice = css`font-size:1.1rem;font-weight:700;color:${accentLight};margin-bottom:8px;`
const starsRow = css`display:flex;gap:2px;margin-bottom:10px;`
const addBtn = css`width:100%;padding:10px;border-radius:10px;background:linear-gradient(135deg,${accent},${accentLight});color:#fff;border:none;font-weight:600;font-size:0.85rem;cursor:pointer;transition:all 0.2s;&:hover{filter:brightness(1.1);}display:flex;align-items:center;justify-content:center;gap:6px;`
const wishBtn = css`position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.4);border:none;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;`

const cartDrawer = (open) => css`position:fixed;right:0;top:0;height:100vh;width:360px;background:#1a0010;border-left:1px solid rgba(225,29,72,0.15);z-index:500;transform:translateX(${open?'0':'100%'});transition:transform 0.3s ease;display:flex;flex-direction:column;@media(max-width:400px){width:100%;}`
const cartHeader = css`padding:20px 20px 16px;border-bottom:1px solid rgba(225,29,72,0.1);display:flex;justify-content:space-between;align-items:center;`
const cartBody = css`flex:1;overflow-y:auto;padding:16px;`
const cartItemStyle = css`display:flex;gap:12px;padding:14px;background:rgba(225,29,72,0.06);border-radius:12px;margin-bottom:12px;`
const cartFooter = css`padding:16px 20px;border-top:1px solid rgba(225,29,72,0.1);`
const checkoutBtn = css`width:100%;padding:14px;border-radius:12px;background:linear-gradient(135deg,${accent},${accentLight});color:#fff;border:none;font-weight:600;font-size:1rem;cursor:pointer;&:hover{filter:brightness(1.1);}`

const CATS = ['Semua', 'Elektronik', 'Fashion', 'Makanan', 'Buku']
const PRODUCTS = [
  { id: 1, name: 'Wireless Earbuds Pro', price: 349000, cat: 'Elektronik', emoji: '🎧', rating: 4.8, sold: 1240 },
  { id: 2, name: 'Sneakers Casual', price: 459000, cat: 'Fashion', emoji: '👟', rating: 4.6, sold: 890 },
  { id: 3, name: 'Kopi Premium 250g', price: 89000, cat: 'Makanan', emoji: '☕', rating: 4.9, sold: 3200 },
  { id: 4, name: 'Clean Code Book', price: 189000, cat: 'Buku', emoji: '📘', rating: 4.8, sold: 560 },
  { id: 5, name: 'Smart Watch Series X', price: 1299000, cat: 'Elektronik', emoji: '⌚', rating: 4.7, sold: 450 },
  { id: 6, name: 'Hoodie Premium', price: 259000, cat: 'Fashion', emoji: '🧥', rating: 4.5, sold: 780 },
  { id: 7, name: 'Croissant Box 6pcs', price: 75000, cat: 'Makanan', emoji: '🥐', rating: 4.8, sold: 2100 },
  { id: 8, name: 'JavaScript Handbook', price: 159000, cat: 'Buku', emoji: '📗', rating: 4.7, sold: 340 },
]

const fmtPrice = n => 'Rp ' + n.toLocaleString('id-ID')

export default function EcommerceDemo() {
  const navigate = useNavigate()
  const [activeCat, setActiveCat] = useState('Semua')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState({})

  const filtered = activeCat === 'Semua' ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCat)
  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id)
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }
  const changeQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0))
  }
  const toggleWish = (id) => setWishlist(p => ({ ...p, [id]: !p[id] }))

  return (
    <div css={page}>
      <nav css={nav}>
        <button css={backBtn} onClick={() => navigate('/')}><ArrowLeft size={16}/> Kembali</button>
        <div css={logo}>ShopNow</div>
        <button css={cartBtn} onClick={() => setCartOpen(true)}>
          <ShoppingCart size={18}/> Keranjang
          {totalItems > 0 && <span css={cartBadge}>{totalItems}</span>}
        </button>
      </nav>

      <div css={heroBanner}>
        <div>
          <h1 css={heroTitle}>Belanja <span style={{ color: accentLight }}>Cerdas</span>, Harga Terbaik</h1>
          <p css={heroSub}>Produk pilihan berkualitas tinggi dengan pengiriman cepat ke seluruh Indonesia.</p>
          <button css={shopNowBtn}>Belanja Sekarang</button>
        </div>
        <div css={heroBig}>🛍️</div>
      </div>

      <div css={filterBar}>
        {CATS.map(c => <button key={c} css={filterChip(activeCat === c)} onClick={() => setActiveCat(c)}>{c}</button>)}
      </div>

      <div css={productsGrid}>
        {filtered.map(p => (
          <div key={p.id} css={productCard} style={{ position: 'relative' }}>
            <div css={productImg} style={{ background: accent + '12' }}>{p.emoji}</div>
            <button css={wishBtn} onClick={() => toggleWish(p.id)}>
              <Heart size={16} fill={wishlist[p.id] ? accent : 'none'} color={wishlist[p.id] ? accent : '#64748b'} />
            </button>
            <div css={productBody}>
              <div css={starsRow}>{[...Array(5)].map((_, i) => <Star key={i} size={11} fill={i < Math.floor(p.rating) ? accentLight : 'none'} color={accentLight}/>)}</div>
              <div css={productName}>{p.name}</div>
              <div css={productPrice}>{fmtPrice(p.price)}</div>
              <div css={css`color:#64748b;font-size:0.75rem;margin-bottom:10px;`}>{p.sold.toLocaleString()} terjual</div>
              <button css={addBtn} onClick={() => addToCart(p)}><Plus size={15}/> Tambah</button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Drawer */}
      <div css={cartDrawer(cartOpen)}>
        <div css={cartHeader}>
          <span css={css`font-weight:700;font-size:1.1rem;color:#fff;`}>🛒 Keranjang ({totalItems})</span>
          <button css={css`background:none;border:none;color:#94a3b8;cursor:pointer;`} onClick={() => setCartOpen(false)}><X size={22}/></button>
        </div>
        <div css={cartBody}>
          {cart.length === 0 ? (
            <div css={css`text-align:center;color:#64748b;padding:40px 0;`}><ShoppingCart size={40} style={{ marginBottom: 12 }}/><p>Keranjang kosong</p></div>
          ) : cart.map(item => (
            <div key={item.id} css={cartItemStyle}>
              <div css={css`font-size:2rem;`}>{item.emoji}</div>
              <div css={css`flex:1;`}>
                <div css={css`color:#fff;font-size:0.85rem;font-weight:600;margin-bottom:4px;`}>{item.name}</div>
                <div css={css`color:${accentLight};font-weight:600;font-size:0.9rem;`}>{fmtPrice(item.price)}</div>
                <div css={css`display:flex;align-items:center;gap:8px;margin-top:8px;`}>
                  <button css={css`width:26px;height:26px;border-radius:6px;background:rgba(225,29,72,0.15);border:none;color:${accentLight};cursor:pointer;display:flex;align-items:center;justify-content:center;`} onClick={() => changeQty(item.id, -1)}><Minus size={13}/></button>
                  <span css={css`color:#fff;font-weight:600;min-width:20px;text-align:center;`}>{item.qty}</span>
                  <button css={css`width:26px;height:26px;border-radius:6px;background:rgba(225,29,72,0.15);border:none;color:${accentLight};cursor:pointer;display:flex;align-items:center;justify-content:center;`} onClick={() => changeQty(item.id, 1)}><Plus size={13}/></button>
                  <button css={css`width:26px;height:26px;border-radius:6px;background:rgba(239,68,68,0.1);border:none;color:#f87171;cursor:pointer;display:flex;align-items:center;justify-content:center;margin-left:auto;`} onClick={() => setCart(p => p.filter(i => i.id !== item.id))}><Trash2 size={13}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div css={cartFooter}>
          <div css={css`display:flex;justify-content:space-between;margin-bottom:14px;`}>
            <span css={css`color:#94a3b8;`}>Total</span>
            <span css={css`color:${accentLight};font-weight:700;font-size:1.1rem;`}>{fmtPrice(totalPrice)}</span>
          </div>
          <button css={checkoutBtn} onClick={() => alert('Checkout berhasil! (Demo)')}>Checkout Sekarang</button>
        </div>
      </div>
      {cartOpen && <div css={css`position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:499;`} onClick={() => setCartOpen(false)}/>}

      <div css={css`text-align:center;padding:24px;color:#64748b;font-size:0.8rem;border-top:1px solid rgba(225,29,72,0.08);`}>© 2026 ShopNow — Demo oleh Abdullah Mirsab</div>
    </div>
  )
}
