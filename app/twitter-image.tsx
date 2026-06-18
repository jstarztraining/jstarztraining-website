import { ogSize, ogContentType, renderOgImage } from '@/lib/og-image';

export const runtime = 'edge';
export const alt = 'JStarz Training — Private Soccer Training in Halifax, NS';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage();
}
