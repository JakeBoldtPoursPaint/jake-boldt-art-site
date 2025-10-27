import React from "react";
import { useParams, Link } from "react-router-dom";
import { VIDEO_PRODUCTS } from "./App.jsx";

export default function ProductPage() {
  const { slug } = useParams();
  const p = VIDEO_PRODUCTS.find(x => x.slug === slug);

  if (!p) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-[#ee05fa] hover:underline">← Back</Link>
          <h1 className="text-3xl font-bold mt-6">Not found</h1>
          <p className="text-white/70 mt-2">This artwork doesn’t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link to="/" className="text-[#ee05fa] hover:underline">← Back to gallery</Link>

        <div className="grid md:grid-cols-2 gap-8 mt-6">
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
    </div>
  </div>
</div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{p.name}</h1>
            <p className="text-white/70 mt-2">Original acrylic on canvas • Signed</p>
            <p className="text-2xl font-semibold mt-4">${p.price.toFixed(2)}</p>

            <a
              href="#"
              className="snipcart-add-item mt-6 inline-block rounded-xl bg-[#ee05fa] text-black font-semibold px-5 py-3 hover:opacity-90 transition"
              data-item-id={p.id}
              data-item-name={p.name}
              data-item-url={p.jsonUrl}
              data-item-price={p.price.toFixed(2)}
              data-item-image={p.videoSrc}
              data-item-description="Original artwork by Jake Boldt"
            >
              Add to Cart — ${p.price.toFixed(2)}
            </a>

            <div className="mt-6 text-white/70 text-sm">
              <p>Ships from Texas in 5–7 days. U.S. shipping included. International on request.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
