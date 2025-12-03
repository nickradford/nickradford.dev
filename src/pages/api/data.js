// Proxy Vercel Analytics to avoid ad blocker detection
export async function GET() {
  try {
    const response = await fetch('https://va.vercel-scripts.com/v1/script.js');
    const script = await response.text();
    
    return new Response(script, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Failed to fetch analytics script:', error);
    return new Response('', { status: 500 });
  }
}
