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
  // Canonical host: 308-redirect www -> apex for SEO (avoids duplicate-content
  // split). Scoped by host, so the apex and the *.vercel.app URL are untouched.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.jstarztraining.com' }],
        destination: 'https://jstarztraining.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
