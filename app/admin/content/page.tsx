import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CONTENT_PAGES } from '@/lib/content-blocks';

export default function AdminContentPage() {
  return (
    <div>
      <AdminPageHeader
        title="Site Content"
        description="Edit the written copy on your public pages. Other pages’ content lives in their own modules (Programs, Coaches, etc.)."
        backHref="/admin"
        backLabel="Dashboard"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONTENT_PAGES.map((p) => (
          <Link
            key={p.slug}
            href={`/admin/content/${p.slug}`}
            className="flex flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card-hover"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-navy">{p.title}</h2>
              <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand">
                Edit →
              </span>
            </div>
            <p className="mt-2 text-sm text-ink/60">{p.blocks.length} editable blocks</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
