/** @type {import('next').NextConfig} */
const nextConfig = {
  // The default .next directory held a corrupted Turbopack dev cache that pegged the
  // dev server and truncated layout chunks, so the form never hydrated in the preview.
  distDir: ".next-fresh",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
