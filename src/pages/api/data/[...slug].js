// Proxy all analytics requests to avoid ad blocker detection
export async function GET({ params }) {
  try {
    const path = params.slug || 'script.js';
    const response = await fetch(`https://va.vercel-scripts.com/v1/${path}`);
    const data = await response.text();
    
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/javascript',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Failed to proxy analytics request:', error);
    return new Response('', { status: 500 });
  }
}

export async function POST({ params, request }) {
  try {
    const path = params.slug || '';
    const body = await request.text();
    
    const response = await fetch(`https://va.vercel-scripts.com/v1/${path}`, {
      method: 'POST',
      headers: request.headers,
      body
    });
    
    const data = await response.text();
    
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json'
      }
    });
  } catch (error) {
    console.error('Failed to proxy analytics POST:', error);
    return new Response('', { status: 500 });
  }
}
