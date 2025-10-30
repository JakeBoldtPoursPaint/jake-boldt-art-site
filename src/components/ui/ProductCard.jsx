import { useEffect, useState } from "react";

export default function ProductCard({ product }) {
  // product is one item from VIDEO_PRODUCTS
  const [details, setDetails] = useState(null);

  // Load extra info (dimensions, "Acrylic on canvas.", status) from the JSON file in /public/products/
  useEffect(() => {
    async function loadDetails() {
      try {
        const res = await fetch(product.jsonUrl);
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Could not load product details for", product.slug, err);
      }
    }
    loadDetails();
  }, [product.jsonUrl, product.slug]);

  // Is this piece sold?
  // true if:
  // - product.sold === true in VIDEO_PRODUCTS
  // OR
  // - its JSON file has "status": "sold"
  const isSold =
    product.sold === true ||
    (details &&
      details.status &&
      details.status.toLowerCase() === "sold");

  // Format 7800 -> "$7,800"
  function formatPrice(num) {
    if (num === 0 || num === undefined || num === null) return "";
    return `$${num.toLocaleString("en-US")}`;
  }

  // Example: "48 x 48 in"
  const dimensionsText = details?.dimensions || "";

  return (
    <div className="relative flex flex-col bg-black/60 border border-neutral-800 rounded-2xl p-4 shadow-[0_0_20px_rgba(0,255,170,0.3)] hover:shadow-[0_0_30px_rgba(0,255,170,0.6)] transition-shadow duration-200">
      {/* SOLD / AVAILABLE badge in top-left */}
      <div className="absolute top-3 left-3">
        {isSold ? (
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
            SOLD
          </span>
        ) : (
          <span className="bg-emerald-500 text-black text-xs font-bold px-2 py-1 rounded-md shadow">
            AVAILABLE
          </span>
        )}
      </div>

      {/* Video preview of the art */}
      <div className="w-full rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 mb-4">
        <video
          src={product.videoSrc}
          className="w-full h-auto block"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          loading="lazy"
        />
      </div>

      {/* Title, location, price */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {/* Name of the piece */}
          <h2 className="text-white text-lg font-semibold leading-tight">
            {product.name}
          </h2>

          {/* Location locked to California (not Texas, no shipping text) */}
          <p className="text-xs text-neutral-400">
            Los Angeles, California
          </p>
        </div>

        <div className="text-right">
          {isSold ? (
            // When sold, don't show price like it's for sale
            <p className="text-red-500 text-sm font-semibold">Collected</p>
          ) : (
            // When available, show formatted price
            <p className="text-emerald-400 text-sm font-semibold">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>

      {/* Size + medium */}
      <div className="mt-3 text-sm text-neutral-300 leading-relaxed space-y-1">
        {dimensionsText && (
          <p className="text-neutral-200">
            {dimensionsText}
          </p>
        )}

        {details?.description && (
          <p className="text-neutral-400 text-xs">
            {details.description}
          </p>
        )}
      </div>

      {/* Bottom status line */}
      <div className="mt-4">
        {isSold ? (
          <div className="text-neutral-500 text-xs uppercase tracking-wide font-medium">
            No longer available
          </div>
        ) : (
          <div className="text-emerald-400 text-xs uppercase tracking-wide font-medium">
            Available now
          </div>
        )}
      </div>
    </div>
  );
}
