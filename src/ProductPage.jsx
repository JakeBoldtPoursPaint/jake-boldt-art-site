import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { VIDEO_PRODUCTS } from "./App.jsx";

export default function ProductPage() {
  const { slug } = useParams();

  // find the product in VIDEO_PRODUCTS using the slug from the URL
  const p = VIDEO_PRODUCTS.find((x) => x.slug === slug);

  // load extra details (dimensions, description, status) from the JSON file in /public/products/*.json
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function loadDetails() {
      if (!p) return;
      try {
        const res = await fetch(p.jsonUrl);
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("could not load product details", err);
      }
    }
    loadDetails();
  }, [p]);

  // figure out if it's sold
  const isSold =
    (p && p.sold === true) ||
    (details &&
      details.status &&
      details.status.toLowerCase() === "sold");

  // format number like 3500 -> $3,500
  function formatPrice(num) {
    if (num === undefined || num === null) return "";
    return `$${num.toLocaleString("en-US")}`;
  }

  // remove any " - Original", " — Original", etc at the end of the name
  function cleanName(name) {
    if (!name) return "";
    // remove hyphen/en dash/em dash + "Original"
    let out = name.replace(/\s*[-–—]\s*Original\s*$/i, "");
    // backup: remove just "Original" at end
    out = out.replace(/\s*Original\s*$/i, "");
    return out.trim();
  }

  // if slug doesn't match anything, show not found
  if (!p) {
    return (
      <div className="min-h-screen bg-black text-white font-sans antialiased pt-14 neon-all p-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="text-[#ee05fa] hover:underline text-sm font-medium"
          >
            ← Back
          </Link>

          <h1 className="text-3xl font-bold mt-6">Not found</h1>
          <p className="text-white/70 mt-2">
            This artwork doesn’t exist.
          </p>
        </div>
      </div>
    );
  }

  const displayName = cleanName(p.name);
  const sizeText = details?.dimensions || "";          // e.g. "36 x 48 in"
  const mediumText = details?.description || "";       // e.g. "Acrylic on canvas."

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased pt-14 neon-all">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          to="/"
          className="text-[#ee05fa] hover:underline text-sm font-medium"
        >
          ← Back to artwork
        </Link>

        <div className="grid md:grid-cols-2 gap-8 mt-6">
          {/* LEFT: video, with SOLD overlay if sold */}
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
                  preload="metadata"
                />

                {isSold && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-4xl font-extrabold text-red-500 drop-shadow-lg">
                      SOLD
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: info */}
          <div>
            {/* Title (cleaned, no dash, no "Original") */}
            <h1 className="text-3xl md:text-4xl font-bold">
              {displayName}
            </h1>

            {/* Size + Medium */}
            <div className="text-white/70 mt-4 text-base leading-relaxed space-y-3">
              {sizeText && <p>{sizeText}</p>}
              {mediumText && <p>{mediumText}</p>}
            </div>

            {/* Price / SOLD state / Add to Cart */}
            {isSold ? (
              <div className="mt-6 space-y-2">
                <div className="text-red-500 font-bold text-xl">
                  SOLD
                </div>
                <div className="text-white/50 text-sm">
                  No longer available
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {/* Price */}
                <div className="text-2xl font-semibold text-white">
                  {formatPrice(p.price)}
                </div>

                {/* Add to Cart button */}
                <a
                  href="#"
                  className="snipcart-add-item inline-block rounded-xl bg-[#ee05fa] text-black font-semibold px-5 py-3 hover:opacity-90 transition"
                  data-item-id={p.id}
                  data-item-name={displayName}
                  data-item-url={p.jsonUrl}
                  data-item-price={p.price.toFixed(2)}
                  data-item-image={p.videoSrc}
                  data-item-description="Original artwork by Jake Boldt"
                >
                  Add to Cart — {formatPrice(p.price)}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
