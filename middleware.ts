import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Edge middleware uses the lightweight config (no Prisma/bcrypt) to gate /admin.
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ['/admin/:path*'],
};
