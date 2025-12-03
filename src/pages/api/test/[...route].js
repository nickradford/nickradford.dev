export const prerender = false;

export async function GET({ params }) {
  try {
    const path = params.route || "script.js";
    return new Response(JSON.stringify({ path }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST({ params, request }) {
  try {
    const path = params.route;
    return new Response(JSON.stringify({ path }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
