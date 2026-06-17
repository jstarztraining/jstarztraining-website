/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Supabase Storage public bucket (uploaded media).
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
};

export default nextConfig;
