/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: '2mb',
  },
}