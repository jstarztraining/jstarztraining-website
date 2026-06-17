import Link from 'next/link';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // admin always reflects current DB state

const MODULES = [
  { key: 'content', title: 'Site Content', desc: 'Per-page text & images across the 9 pages, plus the gallery.', href: null },
  { key: 'programs', title: 'Programs', desc: 'Add, edit, reorder, and toggle programs. Set price text & Shopify links.', href: '/admin/programs' },
  { key: 'schedule', title: 'Schedule', desc: 'Sessions for the calendar & list board. Informational only.', href: '/admin/schedule' },
  { key: 'coaches', title: 'Coaches & Staff', desc: 'Names, roles, bios, photos, ordering.', href: '/admin/coaches' },
  { key: 'testimonials', title: 'Testimonials', desc: 'Quotes from players & parents.', href: '/admin/testimonials' },
  { key: 'faq', title: 'FAQ', desc: 'Questions & answers.', href: '/admin/faq' },
  { key: 'settings', title: 'Site Settings', desc: 'Contact info, hours, map, social links, footer.', href: '/admin/settings' },
  { key: 'hero', title: 'Hero & Banner', desc: 'Homepage hero copy/CTA and the promo banner.', href: '/admin/hero' },
] as const;

export default async function AdminHome() {
  const session = await auth();
  const isAdmin = session?.user.role === 'Admin';

  const [programs, coaches, testimonials, faqs, sessions, media] = await Promise.all([
    prisma.program.count(),
    prisma.coach.count(),
    prisma.testimonial.count(),
    prisma.faqItem.count(),
    prisma.session.count(),
    prisma.mediaAsset.count(),
  ]);

  const stats = [
    { label: 'Programs', value: programs },
    { label: 'Coaches', value: coaches },
    { label: 'Testimonials', value: testimonials },
    { label: 'FAQ items', value: faqs },
    { label: 'Sessions', value: sessions },
    { label: 'Media', value: media },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-black tracking-tight text-navy">
        Welcome back{session?.user.name ? `, ${session.user.name.split(' ')[0]}` : ''}.
      </h1>
      <p className="mt-2 text-ink/65">
        Manage your site content here. Changes go live on the site automatically.
      </p>

      {/* Live counts */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card">
            <div className="font-display text-3xl font-extrabold text-navy">{s.value}</div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-ink/50">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Modules */}
      <h2 className="mt-12 font-heading text-sm font-bold uppercase tracking-[0.16em] text-ink/50">
        Modules
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((m) => {
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-bold text-navy">{m.title}</h3>
                {m.href ? (
                  <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand">
                    Open →
                  </span>
                ) : (
                  <span className="rounded-full bg-mist px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-ink/50">
                    Soon
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{m.desc}</p>
            </>
          );
          return m.href ? (
            <Link
              key={m.key}
              href={m.href}
              className="flex flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card-hover"
            >
              {inner}
            </Link>
          ) : (
            <div
              key={m.key}
              className="flex flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-card"
            >
              {inner}
            </div>
          );
        })}

        {isAdmin ? (
          <div className="flex flex-col rounded-2xl border border-gold/40 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-navy">Users</h3>
              <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-gold-deep">
                Admin
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Manage editor accounts and reset passwords. Admin only.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
