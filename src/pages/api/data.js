// Proxy Vercel Analytics to avoid ad blocker detection
export async function GET() {
  return new Response(null, {
    status: 307,
    headers: {
      'Location': 'https://nickradford.dev/_vercel/insights/script.js'
    }
  });
}
