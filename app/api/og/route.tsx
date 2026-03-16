import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const message = searchParams.get('message') || '내일 지구가 멸망해도 나는 오늘 한 알의 감자를 심겠다';
    const author = searchParams.get('author') || 'Potato Oracle';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F9F1E8', // potato-bg
            padding: '40px',
            border: '20px solid #7D5A44', // potato-primary
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              padding: '60px',
              borderRadius: '40px',
              border: '8px solid #7D5A44',
              boxShadow: '15px 15px 0px #C68E17', // potato-accent/secondary mix
              maxWidth: '900px',
            }}
          >
            <div style={{ fontSize: '100px', marginBottom: '40px' }}>🥔</div>
            <div
              style={{
                fontSize: '48px',
                fontWeight: '900',
                color: '#7D5A44',
                textAlign: 'center',
                lineHeight: '1.4',
                marginBottom: '40px',
                fontFamily: 'sans-serif',
              }}
            >
              "{message}"
            </div>
            <div
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#C68E17',
              }}
            >
              - {author} -
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '60px',
              fontSize: '24px',
              fontWeight: '900',
              color: '#7D5A44',
              opacity: '0.5',
            }}
          >
            Potato Fortune Cookie
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e.message);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
