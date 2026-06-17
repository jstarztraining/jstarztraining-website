import { Archivo, Hanken_Grotesk } from 'next/font/google';

// Body — warm, humanist, highly legible. Carries the "community" voice.
export const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800'],
});

// Display + headings — one structured, athletic grotesque carried across a wide
// weight range (900 monumental display → 600 headings). A deliberate single
// family with committed weight contrast, paired against the humanist body.
export const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '600', '700', '800', '900'],
});

export const fontVariables = `${hankenGrotesk.variable} ${archivo.variable}`;
