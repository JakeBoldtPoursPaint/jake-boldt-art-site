import React, { useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

const ACCENT = '#ee05fa'

// === Videos for the gallery ===
// Drop files into /public and list them here
const GALLERY_VIDEOS = [
  { id: 1, title: 'Pendulum Pour #1', src: '/pour1.mp4' },
  { id: 2, title: 'Pendulum Pour #2', src: '/pour2.mp4' },
  { id: 3, title: 'Pendulum Pour #3', src: '/pour3.mp4' },
  // Add more like { id: 4, title: '...', src: '/pour4.mp4' },
]

function HeaderMinimal() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-black/60 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <a href="#home" className="text-white hover:text-white font-semibold tracking-tight">
          Jake Boldt
          <span className="ml-2 text-white/60 text-xs align-middle">Artist & Content Creator</span>
        </a>
        {/* Menu */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen(v => !v)}
          className="text-white/80 hover:text-white p-2 rounded-lg border border-white/10"
        >
          {open ? <X size={18}/> : <Menu size={18}/>}
        </button>
        <button
  type="button"
  className="snipcart-checkout text-white/80 hover:text-white p-2 rounded-lg border border-white/10 ml-2"
  aria-label="Open cart"
>
  Cart (<span className="snipcart-items-count">0</span>)
</button>
      </div>

      {open && (
        <div className="absolute right-4 mt-1 w-48 rounded-xl border border-white/10 bg-black/90 shadow-lg">
          <nav className="p-2 text-sm">
            <a href="#gallery" className="block px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10">Artwork</a>
            <a href="#links" className="block px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10">Affiliate Links</a>
            <a href="https://jakeboldtpourspaint.gumroad.com/l/ieujo" target="_blank" rel="noreferrer" className="block px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10">Pendulum Guide</a>
            <a href="#contact" className="block px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10">Contact</a>
          </nav>
        </div>
      )}
    </header>
  )
}


function Landing() {
  return (
    <section id="home" className="min-h-[100dvh] relative flex items-center justify-center bg-black overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        src="/bg-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
        // poster optional: add /bg-poster.jpg in /public for faster first paint
      />
      {/* Soft neon glow overlay */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] blur-3xl opacity-30"
        style={{ background: `radial-gradient(50% 50% at 50% 50%, ${ACCENT}66 0%, transparent 60%)` }}
      />
      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-tight text-white animate-neon">
  Pendulum & Acrylic Pour Paintings
</h1>
<a
  href="#"
  className="snipcart-add-item rounded-xl bg-[#ee05fa] text-black font-semibold px-4 py-2 hover:opacity-90 transition mt-6 inline-block"
  data-item-id="test-print-1"
  data-item-name="Test Print"
  data-item-url="/test-print"
  data-item-price="25.00"
  data-item-description="Test product to verify add-to-cart works."
>
  Add “Test Print” — $25
</a>


        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <a
            href="#gallery"
            className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white px-5 py-4 inline-flex items-center justify-center gap-2"
          >
            Artwork <ArrowRight size={16}/>
          </a>
          <a
            href="#links"
            className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white px-5 py-4 inline-flex items-center justify-center gap-2"
          >
            Affiliate Links <ArrowRight size={16}/>
          </a>
          <a
            href="https://jakeboldtpourspaint.gumroad.com/l/ieujo"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl text-black px-5 py-4 inline-flex items-center justify-center gap-2"
            style={{ backgroundColor: ACCENT }}
          >
            Pendulum Painting Guide <ArrowRight size={16}/>
          </a>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section id="gallery" className="bg-black border-t border-white/10 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Artwork</h2>
        <p className="text-white/60 mt-2">Video clips from the studio.</p>

        <div className="mt-8 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_VIDEOS.map(v => (
            <div key={v.id} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <div className="aspect-[4/3]">
                <video
                  src={v.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                />
              </div>
              <div className="p-4 text-white/80 text-sm">{v.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Links() {
  return (
    <section id="about" className="bg-black border-t border-white/10 py-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-white mb-6">About Jake</h2>
        <p className="text-white/70 mb-10 leading-relaxed">
          I’m a visual artist based in Los Angeles, known for pendulum and acrylic-pour paintings where gravity and motion
          become the brush. My work blends color, physics, and rhythm — transforming raw paint into movement and emotion.  
          Through social-media videos and art tutorials, I share the process so anyone can explore creativity on their own canvas.
        </p>

        <div className="flex justify-center gap-6">
          <a
            href="https://www.facebook.com/jake.boldt.179148/"
            target="_blank"
            className="text-[#ee05fa] hover:text-white transition"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/jakeboldt_/"
            target="_blank"
            className="text-[#ee05fa] hover:text-white transition"
          >
            Instagram
          </a>
          <a
            href="https://tiktok.com/@jakeboldt0"
            target="_blank"
            className="text-[#ee05fa] hover:text-white transition"
          >
            TikTok
          </a>
          <a
            href="https://jakeboldtpourspaint.gumroad.com/l/ieujo"
            target="_blank"
            className="text-[#ee05fa] hover:text-white transition"
          >
            Gumroad
          </a>
        </div>
      </div>
    </section>
  )
}


function Contact() {
  return (
    <section id="contact" className="bg-black border-t border-white/10 py-20">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">Contact Me</h2>
        <p className="text-white/60 mb-8">
          Want to collaborate, commission a piece, or learn more? Fill out the form and I’ll get back to you.
        </p>

        <form
          action="https://formsubmit.co/boldtjake573@gmail.com"
          method="POST"
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-white/50"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-white/50"
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Your message"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-white/50"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-[#ee05fa] text-black font-semibold py-3 hover:opacity-90 transition"
          >
            Send Message
          </button>

          {/* FormSubmit options */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
        </form>
      </div>
    </section>
  )
}
function Shop() {
  const items = [
    {
      id: 'gumroad',
      title: 'Pendulum Painting Guide (PDF)',
      blurb:
        'My step-by-step pendulum course: setup, paint ratios, swing control, troubleshooting, and pro tips.',
      cta: 'View on Gumroad',
      href: 'https://jakeboldtpourspaint.gumroad.com/l/ieujo',
      tag: 'Digital Download',
    },
    {
      id: 'decoart',
      title: 'DecoArt Paints (Affiliate)',
      blurb:
        'The paint line I use for acrylic pours. Using this link supports my art at no extra cost.',
      cta: 'Shop DecoArt (Affiliate)',
      href: 'https://shop.decoart.com?ref=ndc2nti',
      tag: 'Materials',
    },
    // Add more items by copying this block:
    // {
    //   id: 'canvas',
    //   title: 'Stretched Canvases',
    //   blurb: 'My go-to canvas sizes and brands for high-impact pours.',
    //   cta: 'Buy Canvases',
    //   href: 'https://example.com/your-affiliate-link',
    //   tag: 'Surfaces',
    // },
  ]

  return (
    <section id="shop" className="bg-black border-t border-white/10 py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-white">Shop</h2>
          <p className="text-white/60 mt-2">
            Courses and materials I personally use. Some links are affiliate—thanks for the support!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col">
              <div className="text-xs uppercase tracking-wide text-white/50 mb-2">{it.tag}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{it.title}</h3>
              <p className="text-white/70 text-sm mb-5 flex-1">{it.blurb}</p>
              <a
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-[#ee05fa] text-black font-semibold px-4 py-2 hover:opacity-90 transition"
              >
                {it.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased pt-14">
      <HeaderMinimal />
      <Landing />
      <Gallery />
      <Shop />
      <Links />
      <Contact />
    </div>
  )
}
