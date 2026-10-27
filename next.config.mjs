/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so Capacitor can bundle the app from the `out` folder.
  output: "export",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
