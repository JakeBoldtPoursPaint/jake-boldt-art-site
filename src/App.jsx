import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT = "#ee05fa";

// (not used directly but leaving here for future gallery stuff)
const GALLERY_VIDEOS = [
  { id: 1, title: "Pendulum Pour #1", src: "/pour1.mp4" },
  { id: 2, title: "Pendulum Pour #2", src: "/pour2.mp4" },
  { id: 3, title: "Pendulum Pour #3", src: "/pour3.mp4" },
];

// =====================
// HEADER (tall, with cart, menu item now "Jake’s Supplies")
// =====================
function HeaderMinimal() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-black/60 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          className="text-white hover:text-white font-semibold tracking-tight leading-tight"
        >
          <div className="text-lg font-semibold text-white">
            Jake Boldt
          </div>
          <div className="text-white/60 text-[0.7rem] md:text-xs">
            Artist &amp; Content Creator
          </div>
        </a>

        {/* Cart + Menu */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <button
            type="button"
            className="snipcart-checkout text-white/80 hover:text-white p-3 rounded-lg border border-white/10"
            aria-label="Open cart"
          >
            🛒 <span className="snipcart-items-count">0</span>
          </button>

          {/* Menu toggle */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="text-white/80 hover:text-white p-3 rounded-lg border border-white/10"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute right-4 mt-1 w-48 rounded-xl border border-white/10 bg-black/90 shadow-lg">
          <nav className="p-2 text-sm">
            {/* Jake's Supplies (Amazon list) */}
            <a
              href="https://amzn.to/3JtYAgT"
              target="_blank"
              rel="noreferrer"
              className="block px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            >
              Jake’s Supplies
            </a>

            {/* Pendulum Guide (Gumroad) */}
            <a
              href="https://jakeboldtpourspaint.gumroad.com/l/ieujo"
              target="_blank"
              rel="noreferrer"
              className="block px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            >
              Pendulum Guide
            </a>

            {/* Contact (scrolls to form on page) */}
            <a
              href="#contact"
              className="block px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// =====================
// LANDING / HERO
// Buttons: Artwork / Jake's Supplies / Pendulum Guide
// No arrows, centered text
// =====================
function Landing() {
  return (
    <section
      id="home"
      className="min-h-[100dvh] relative flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Background video — full brightness */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/bg-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] blur-3xl opacity-30"
        style={{
          background: `radial-gradient(50% 50% at 50% 50%, ${ACCENT}66 0%, transparent 60%)`,
        }}
      />

      {/* CENTER content (title + mobile buttons) */}
      <div className="relative max-w-3xl mx-auto px-4 text-center -translate-y-[8vh] md:-translate-y-[10vh] lg:-translate-y-[14vh] xl:-translate-y-[18vh]">

        

        {/* MOBILE/TABLET buttons; hidden on xl+ */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:hidden">
          <a href="#shop" className="neon-btn relative block text-2xl md:text-3xl font-extrabold py-6 text-center leading-tight">Artwork</a>
          <a href="https://shop.decoart.com?ref=ndc2nti" target="_blank" rel="noreferrer" className="neon-btn relative block text-2xl md:text-3xl font-extrabold py-6 text-center leading-tight">My Paint (20% Off)</a>
          <a href="https://amzn.to/3JtYAgT" target="_blank" rel="noreferrer" className="neon-btn relative block text-2xl md:text-3xl font-extrabold py-6 text-center leading-tight">Jake’s Supplies</a>
          <a href="https://jakeboldtpourspaint.gumroad.com/l/ieujo" target="_blank" rel="noreferrer" className="neon-btn relative block text-2xl md:text-3xl font-extrabold py-6 text-center leading-tight">Pendulum Guide</a>
        </div>
      </div>

      {/* DESKTOP (xl+): side stacks — centered vertically, taller buttons, not near edges, hover zoom ON */}
      {/* Left stack */}
      <div className="hidden xl:flex flex-col gap-12 items-end absolute top-1/2 -translate-y-1/2 left-[9%] z-10">
        <a
          href="#shop"
          className="neon-btn block text-4xl font-extrabold py-20 text-center leading-tight w-80"
        >
          Artwork
        </a>
        <a
          href="https://shop.decoart.com?ref=ndc2nti"
          target="_blank"
          rel="noreferrer"
          className="neon-btn block text-4xl font-extrabold py-20 text-center leading-tight w-80"
        >
          My Paint (20% Off)
        </a>
      </div>

      {/* Right stack */}
      <div className="hidden xl:flex flex-col gap-12 items-start absolute top-1/2 -translate-y-1/2 right-[9%] z-10">
        <a
          href="https://amzn.to/3JtYAgT"
          target="_blank"
          rel="noreferrer"
          className="neon-btn block text-4xl font-extrabold py-20 text-center leading-tight w-80"
        >
          Jake’s Supplies
        </a>
        <a
          href="https://jakeboldtpourspaint.gumroad.com/l/ieujo"
          target="_blank"
          rel="noreferrer"
          className="neon-btn block text-4xl font-extrabold py-20 text-center leading-tight w-80"
        >
          Pendulum Guide
        </a>
      </div>
    </section>
  );
}


// =====================
// ABOUT / LINKS / SOCIAL
// (this section is still id="about", we just don't pretend it's the affiliate link target anymore)
// =====================
function Links() {
  return (
    <section
      id="about"
      className="bg-black border-t border-white/10 py-20"
    >
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-white mb-6">
          About Me
        </h2>
        <p className="text-white/70 mb-10 leading-relaxed">
          I’m a visual artist known for pendulum and acrylic-pour
          paintings where gravity and motion become the brush. My work
          blends color, physics, and rhythm — transforming raw paint
          into movement and emotion. Through social-media videos and art
          tutorials, I share the process so anyone can explore
          creativity on their own canvas.
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
  );
}

// =====================
// CONTACT
// =====================
function Contact() {
  return (
    <section
      id="contact"
      className="bg-black border-t border-white/10 py-20"
    >
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Contact Me
        </h2>
        <p className="text-white/60 mb-8">
          Want to collaborate, commission a piece, or learn more? Fill
          out the form and I’ll get back to you.
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
  );
}

// =====================
// (Keeping GuidesandAffliates component in the file for now in case you ever want
// an on-page gear grid later, but we are NOT rendering it, and we're not linking to it.)
// =====================
function GuidesandAffliates() {
  const items = [
    {
      id: "gumroad",
      title: "Pendulum Painting Guide (PDF)",
      blurb:
        "My step-by-step pendulum course: setup, paint ratios, swing control, troubleshooting, and pro tips.",
      cta: "View on Gumroad",
      href: "https://jakeboldtpourspaint.gumroad.com/l/ieujo",
      tag: "Digital Download",
    },
    {
      id: "decoart",
      title: "DecoArt Paints (Affiliate)",
      blurb:
        "The paint line I use for acrylic pours. Using this link supports my art at no extra cost.",
      cta: "Shop DecoArt (Affiliate)",
      href: "https://shop.decoart.com?ref=ndc2nti",
      tag: "Materials",
    },
  ];

  return (
    <section
      id="links"
      className="bg-black border-t border-white/10 py-20"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-white">
            Jake’s Supplies
          </h2>
          <p className="text-white/60 mt-2">
            My studio kit: paints, pouring medium, canvases, tools.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <div
              key={it.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col"
            >
              <div className="text-xs uppercase tracking-wide text-white/50 mb-2">
                {it.tag}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {it.title}
              </h3>
              <p className="text-white/70 text-sm mb-5 flex-1">
                {it.blurb}
              </p>
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
  );
}

// =====================
// VIDEO_PRODUCTS DATA
// =====================
export const VIDEO_PRODUCTS = [
  {
    id: "pendulum-energy-1",
    slug: "pendulum-energy",
    name: "Pendulum Energy — Original",
    sold: true,
    price: 9100.0,
    jsonUrl: "/products/pendulum-energy.json",
    videoSrc: "/videos/pendulum-energy.mp4",
  },
  {
    id: "cosmic-flow-1",
    slug: "cosmic-flow",
    name: "Cosmic Flow — Original",
    price: 820.0,
    jsonUrl: "/products/cosmic-flow.json",
    videoSrc: "/videos/cosmic-flow.mp4",
  },
  {
    id: "neon-drip-1",
    slug: "neon-drip",
    name: "Neon Drip — Original",
    price: 1450.0,
    jsonUrl: "/products/neon-drip.json",
    videoSrc: "/videos/neon-drip.mp4",
  },
  {
    id: "candy-drift-1",
    slug: "candy-drift",
    name: "Candy Drift — Original",
    price: 1800.0,
    jsonUrl: "/products/candy-drift.json",
    videoSrc: "/videos/candy-drift.mp4",
  },
  {
    id: "spring-melt-1",
    slug: "spring-melt",
    name: "Spring Melt — Original",
    price: 7800,
    jsonUrl: "/products/spring-melt.json",
    videoSrc: "/videos/spring-melt.mp4",
  },
  {
    id: "voltage-drip-1",
    slug: "voltage-drip",
    name: "Voltage Drip — Original",
    price: 3500,
    jsonUrl: "/products/voltage-drip.json",
    videoSrc: "/videos/voltage-drip.mp4",
  },
];

// =====================
// SHOP SECTION (homepage gallery)
// - strips "— Original" in UI
// - video is clickable
// - SOLD overlay
// - Add to Cart for available
// =====================
function Shop() {
  // remove " — Original" etc
  function cleanName(name) {
    if (!name) return "";
    let out = name.replace(/\s*[-–—]\s*Original\s*$/i, "");
    out = out.replace(/\s*Original\s*$/i, "");
    return out.trim();
  }

  // format 3500 -> $3,500
  function formatPrice(num) {
    if (num === undefined || num === null) return "";
    return `$${num.toLocaleString("en-US")}`;
  }

  return (
    <section
      id="shop"
      className="py-16 border-t border-white/10 bg-black"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl mb-8 animate-neon">
          Artwork
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEO_PRODUCTS.map((p) => {
            const displayName = cleanName(p.name);
            const humanPrice = formatPrice(p.price); // "$3,500"

            return (
              <article
                key={p.id}
                className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
              >
                {/* CLICKABLE VIDEO */}
                <Link
                  to={`/p/${p.slug}`}
                  className="block relative aspect-[9/16] bg-black overflow-hidden"
                >
                  <video
                    src={p.videoSrc}
                    playsInline
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />
                  {p.sold && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-4xl font-extrabold text-red-500 drop-shadow-lg">
                        SOLD
                      </span>
                    </div>
                  )}
                  
                </Link>

                <div className="p-4 pt-6">
                  {/* CLICKABLE TITLE */}
                  <h3 className="text-lg font-semibold">
                    <Link
                      to={`/p/${p.slug}`}
                      className="hover:underline focus:underline"
                    >
                      {displayName}
                    </Link>
                  </h3>

                  {/* PRICE, NO .00 */}
                  <p className="text-white/70 mt-1">{humanPrice}</p>

                  {/* SOLD / ADD TO CART */}
                  {p.sold ? (
                    <p className="mt-4 text-red-500 font-bold">
                      SOLD
                    </p>
                  ) : (
                    <a
                      href="#"
                      className="snipcart-add-item mt-4 inline-block rounded-xl bg-[#ee05fa] text-black font-semibold px-4 py-2 hover:opacity-90 transition"
                      data-item-id={p.id}
                      data-item-name={displayName}
                      data-item-url={p.jsonUrl}
                      data-item-price={p.price.toFixed(2)}  // this stays toFixed(2) for Snipcart backend
                      data-item-image={p.videoSrc}
                      data-item-description="Original artwork by Jake Boldt"
                    >
                      Add to Cart — {humanPrice}
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =====================
// MAIN APP
// =====================
export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased pt-20 neon-all">
      <HeaderMinimal />
      <Landing />
      <Shop />
      <Links />
      <Contact />
    </div>
  );
}
