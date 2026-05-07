"use client";

import dynamic from "next/dynamic";

/**
 * Sanity Studio (and `sanity.config` itself) touch `window` at module-load
 * time. We dynamically import the inner component with `ssr: false` so the
 * entire dependency chain — including the config — only evaluates in the
 * browser. This avoids the "window is not defined" Next.js 16 SSR error.
 */
const StudioInner = dynamic(() => import("./StudioInner"), { ssr: false });

export default function Studio() {
  return <StudioInner />;
}
