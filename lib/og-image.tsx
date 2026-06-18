import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

// Branded social-share card (navy gradient + gold accent). Shared by the
// opengraph-image and twitter-image routes.
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          backgroundColor: '#06183f',
          backgroundImage:
            'radial-gradient(120% 100% at 50% -10%, #114089 0%, #0a2a63 45%, #06183f 80%, #050f29 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 56, height: 4, backgroundColor: '#e6b945' }} />
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#f4d889',
            }}
          >
            Private Soccer Training · Halifax, NS
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 128, fontWeight: 900, lineHeight: 1, letterSpacing: -4 }}>
          <span>Elevate Your&nbsp;</span>
          <span style={{ color: '#e6b945' }}>Game.</span>
        </div>

        {/* Footer wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1158c4',
                border: '3px solid #e6b945',
                fontSize: 30,
                fontWeight: 900,
              }}
            >
              JS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: -1 }}>JStarz Training</div>
              <div style={{ fontSize: 22, color: '#9fb6df' }}>jstarztraining.com</div>
            </div>
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, color: '#f4d889' }}>No ego. No politics. Just soccer.</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
