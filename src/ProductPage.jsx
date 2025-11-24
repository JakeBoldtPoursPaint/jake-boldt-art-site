import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { VIDEO_PRODUCTS, MERCH_PRODUCTS } from "./App.jsx";

export default function ProductPage() {
  const { slug } = useParams();

  // Find product
  const p =
    VIDEO_PRODUCTS.find((x) => x.slug === slug) ||
    MERCH_PRODUCTS.find((x) => x.slug === slug);

  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function loadJson() {
      if (!p?.jsonUrl) return;
      try {
        const res = await fetch(p.jsonUrl);
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Failed loading product JSON:", err);
      }
    }
    loadJson();
  }, [p]);

  // HOOKS (must always stay in same order)
  const isMerch = p?.type === "merch";

  const [color, setColor] = useState(null);
  const [size, setSize] = useState("M");
  const [activeImage, setActiveImage] = useState("front");

  useEffect(() => {
    if (isMerch && details?.variants?.length > 0) {
      setColor(details.variants[0].color);
    }
  }, [isMerch, details]);

  const currentVariant =
    isMerch && details?.variants
      ? details.variants.find((v) => v.color === color)
      : null;

  const isSold =
    p?.sold === true ||
    (details?.status &&
      details.status.toLowerCase() === "sold");

  function cleanName(name) {
    if (!name) return "";
    return name.replace(/\s*[-–—]\s*Original\s*$/i, "").trim();
  }

  function formatPrice(num) {
    return `$${num.toLocaleString("en-US")}`;
  }

  if (!p) {
    return (
      <div className="min-h-screen bg-black text-white pt-14 p-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-[#ee05fa] hover:underline text-sm">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold mt-6">Not found</h1>
        </div>
      </div>
    );
  }

  // =========================
  // MERCH PAGE (no flip)
  // =========================
  if (isMerch) {
    if (!details || !details.variants) {
      return (
        <div className="min-h-screen bg-black text-white pt-14 p-6">
          <Link to="/" className="text-[#ee05fa] hover:underline text-sm">
            ← Back
          </Link>
          <div className="mt-6 text-white/70">Loading…</div>
        </div>
      );
    }

    const displayImage =
      activeImage === "front"
        ? currentVariant?.front
        : currentVariant?.back;

    return (
      <div className="min-h-screen bg-black text-white pt-14">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Link to="/" className="text-[#ee05fa] hover:underline text-sm">
            ← Back
          </Link>

          <div className="grid md:grid-cols-2 gap-8 mt-6">
            {/* LEFT — images */}
            <div>
              <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-[#1a1a1a] border border-white/10">
                <img
                  src={displayImage}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={`${p.name} ${activeImage}`}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 mt-4">
                <img
                  src={currentVariant?.front}
                  className={`w-20 h-20 rounded-xl border cursor-pointer object-cover ${
                    activeImage === "front"
                      ? "border-[#ee05fa]"
                      : "border-white/20"
                  }`}
                  onClick={() => setActiveImage("front")}
                />
                <img
                  src={currentVariant?.back}
                  className={`w-20 h-20 rounded-xl border cursor-pointer object-cover ${
                    activeImage === "back"
                      ? "border-[#ee05fa]"
                      : "border-white/20"
                  }`}
                  onClick={() => setActiveImage("back")}
                />
              </div>
            </div>

            {/* RIGHT — content */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{p.name}</h1>
              <p className="text-white/70 mt-3 text-lg">${p.price}</p>

              {/* COLOR */}
              <div className="mt-6">
                <label className="block text-sm text-white/70 mb-1">
                  Color
                </label>
                <select
                  value={color || ""}
                  onChange={(e) => setColor(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg p-2 text-white"
                >
                  {details.variants.map((v) => (
                    <option key={v.color} value={v.color}>
                      {v.color}
                    </option>
                  ))}
                </select>
              </div>

              {/* SIZE */}
              <div className="mt-6">
                <label className="block text-sm text-white/70 mb-1">
                  Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg p-2 text-white"
                >
                  {(details.sizes || [
                    "S",
                    "M",
                    "L",
                    "XL",
                    "2XL",
                    "3XL",
                  ]).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* CART */}
              <div className="mt-8">
                <button
                  className="snipcart-add-item inline-block rounded-xl bg-[#ee05fa] text-black font-semibold px-5 py-3 hover:opacity-90 transition"
                  data-item-id={p.id}
                  data-item-name={`${p.name} - ${color} - ${size}`}
                  data-item-url={p.jsonUrl}
                  data-item-price={p.price.toFixed(2)}
                  data-item-image={displayImage}
                  data-item-custom1-name="Color"
                  data-item-custom1-value={color}
                  data-item-custom1-options={details.variants
                    .map((v) => v.color)
                    .join("|")}
                  data-item-custom2-name="Size"
                  data-item-custom2-value={size}
                  data-item-custom2-options={(details.sizes || [
                    "S",
                    "M",
                    "L",
                    "XL",
                    "2XL",
                    "3XL",
                  ]).join("|")}
                >
                  Add to Cart — ${p.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

// ============================
// ARTWORK PAGE (with neon UV note)
// ============================
const displayName = cleanName(p.name);

// Show neon-glow note ONLY for Voltage Drip + Neon Drip
const shouldShowGlowNote =
  p.slug === "voltage-drip" || p.slug === "neon-drip";

// Inject neon pulse animation once
const neonKeyframes = `
@keyframes neonPulse {
  0% { opacity: 0.6; text-shadow: 0 0 4px #39ff14; }
  50% { opacity: 1; text-shadow: 0 0 8px #39ff14, 0 0 14px #39ff14; }
  100% { opacity: 0.6; text-shadow: 0 0 4px #39ff14; }
}
`;

if (!document.getElementById("neonPulseStyles")) {
  const style = document.createElement("style");
  style.id = "neonPulseStyles";
  style.innerHTML = neonKeyframes;
  document.head.appendChild(style);
}

return (
  <div className="min-h-screen bg-black text-white pt-14">
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/" className="text-[#ee05fa] hover:underline text-sm">
        ← Back to artwork
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {/* LEFT */}
        <div className="md:sticky md:top-6">
          <div className="mx-auto w-full max-w-[520px]">
            <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-black">
              <video
                src={p.videoSrc}
                playsInline
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />

              {isSold && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-4xl font-extrabold text-red-500">
                    SOLD
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{displayName}</h1>

          {/* 🔥 Neon UV glow note */}
          {shouldShowGlowNote && details?.note && (
            <p
              className="mt-2 text-[#39ff14] text-sm tracking-wide font-semibold"
              style={{
                animation: "neonPulse 2.4s ease-in-out infinite",
                textShadow: "0 0 6px #39ff14"
              }}
            >
              {details.note}
            </p>
          )}

          {details?.dimensions && (
            <p className="text-white/70 mt-4">{details.dimensions}</p>
          )}

          {details?.description && (
            <p className="text-white/70 mt-3 leading-relaxed">
              {details.description}
            </p>
          )}

          {!isSold && (
            <div className="mt-6">
              <div className="text-2xl font-semibold text-white">
                {formatPrice(p.price)}
              </div>

              <a
                href="#"
                className="snipcart-add-item inline-block mt-4 rounded-xl bg-[#ee05fa] text-black font-semibold px-5 py-3 hover:opacity-90 transition"
                data-item-id={p.id}
                data-item-name={displayName}
                data-item-url={p.jsonUrl}
                data-item-price={p.price.toFixed(2)}
                data-item-image={p.videoSrc}
              >
                Add to Cart — {formatPrice(p.price)}
              </a>
            </div>
          )}

          {isSold && (
            <div className="mt-6 text-red-500 font-bold text-xl">
              SOLD
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

}
