import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ContentForm } from '@/components/admin/content/ContentForm';
import { getPageDef } from '@/lib/content-blocks';
import { getPageContent } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function EditContentPage({ params }: { params: { slug: string } }) {
  const def = getPageDef(params.slug);
  if (!def) notFound();

  const get = await getPageContent(params.slug);
  const values = Object.fromEntries(def.blocks.map((b) => [b.key, get(b.key)]));

  return (
    <div>
      <AdminPageHeader
        title={`${def.title} content`}
        description="Changes go live on the site after you save."
        backHref="/admin/content"
        backLabel="Site Content"
      />
      <ContentForm slug={def.slug} blocks={def.blocks} values={values} />
    </div>
  );
}
