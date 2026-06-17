import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-safe auth config (no Prisma / bcrypt). Used by middleware for route
 * protection and shared into the full Node config in auth.ts. The Credentials
 * provider — which needs Prisma + bcrypt — is added there, not here.
 */
export const authConfig = {
  trustHost: true,
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
  providers: [],
  callbacks: {
    // Protect the /admin route group.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      if (isOnAdmin) return isLoggedIn;
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as typeof session.user.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
