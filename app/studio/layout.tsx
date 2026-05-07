/**
 * Studio segment layout — renders children full-bleed without site chrome.
 * The site's <Navbar /> and <Footer /> opt out of rendering on /studio paths
 * (see usePathname() guard inside each component).
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
