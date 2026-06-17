import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { GalleryManager } from '@/components/admin/gallery/GalleryManager';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  const assets = await prisma.mediaAsset.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div>
      <AdminPageHeader
        title="Gallery"
        description="Upload photos, edit alt text, drag to reorder, and delete. Shown on the public gallery."
        backHref="/admin"
        backLabel="Dashboard"
      />
      <GalleryManager assets={assets} />
    </div>
  );
}
