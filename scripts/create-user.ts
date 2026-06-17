/**
 * Create or update a JStarz admin/editor account.
 *
 *   npm run user:create -- <email> <password> <Admin|Editor> ["Full Name"]
 *
 * Example:
 *   npm run user:create -- jordan@jstarztraining.com 'StrongPass123' Admin "Jordan Ellis"
 *
 * Upserts by email, so re-running with a new password resets it. There is no
 * public signup or email-reset flow (§6) — accounts are created here / by the
 * Admin in the dashboard.
 */
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const [email, password, roleArg, name] = process.argv.slice(2);

  if (!email || !password || !roleArg) {
    console.error('Usage: npm run user:create -- <email> <password> <Admin|Editor> ["Full Name"]');
    process.exit(1);
  }
  if (roleArg !== 'Admin' && roleArg !== 'Editor') {
    console.error(`Role must be "Admin" or "Editor" (got "${roleArg}").`);
    process.exit(1);
  }
  if (password.length < 8) {
    console.error('Password must be at least 8 characters.');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const normalizedEmail = email.toLowerCase().trim();

  const user = await prisma.user.upsert({
    where: { email: normalizedEmail },
    update: { passwordHash, role: roleArg as Role, name: name ?? undefined },
    create: { email: normalizedEmail, passwordHash, role: roleArg as Role, name: name ?? null },
  });

  console.log(`✅ ${user.role} account ready: ${user.email}${user.name ? ` (${user.name})` : ''}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
