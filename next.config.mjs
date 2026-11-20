/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dev only: the default .next directory held a corrupted Turbopack dev cache that
  // pegged the dev server and truncated layout chunks. Production builds must keep
  // .next because Vercel looks for the routes manifest there.
  distDir: process.env.NODE_ENV === "development" ? ".next-fresh" : ".next",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
