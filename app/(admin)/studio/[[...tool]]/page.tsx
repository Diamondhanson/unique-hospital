/**
 * Embedded Sanity Studio mounted at /studio.
 * The actual <NextStudio /> lives in a client component (Studio.tsx) because
 * Sanity initialises React contexts at module load time, which can't happen
 * inside a server component.
 */
export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

import Studio from "./Studio";

export default function StudioPage() {
  return <Studio />;
}
