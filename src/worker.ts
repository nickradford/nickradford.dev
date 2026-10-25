/**
 * Custom Worker entrypoint for @astrojs/cloudflare.
 *
 * Adds `Accept: text/markdown` content negotiation for blog pages:
 * requests to /blog/:slug that prefer markdown are served the prerendered
 * /blog/:slug.md asset, with the canonical/noindex headers. Everything else
 * falls through to the adapter's default handler.
 */
import { handle } from "@astrojs/cloudflare/handler";
import type { SSRManifest } from "astro";
import { App } from "astro/app";

const MARKDOWN_HEADERS = (canonicalUrl: string): HeadersInit => ({
  "Content-Type": "text/markdown; charset=utf-8",
  Link: `<${canonicalUrl}>; rel="canonical"`,
  "X-Robots-Tag": "noindex, follow",
  Vary: "Accept",
});

const acceptsMarkdown = (request: Request) =>
  (request.headers.get("Accept") ?? "")
    .split(",")
    .some((entry) => entry.trim().toLowerCase().startsWith("text/markdown"));

export function createExports(manifest: SSRManifest) {
  const app = new App(manifest);

  const serveMarkdown = async (env: Env, mdUrl: string, canonicalUrl: string) => {
    const asset = await env.ASSETS.fetch(mdUrl);
    if (asset.status === 404) {
      return undefined; // unknown slug/draft — fall through so the 404 page renders
    }
    return new Response(asset.body, {
      status: asset.status,
      headers: { ...asset.headers, ...MARKDOWN_HEADERS(canonicalUrl) },
    });
  };

  const fetch = async (request: Request, env: Env, context: ExecutionContext): Promise<Response> => {
    const url = new URL(request.url);

    // www → apex (was Vercel's job before the cutover)
    if (url.hostname === "www.nickradford.dev") {
      const redirectTo = new URL(url.pathname + url.search, "https://nickradford.dev");
      return Response.redirect(redirectTo.toString(), 301);
    }

    // trailingSlash: "never" — the ASSETS binding fetch bypasses
    // html_handling redirects, so normalize paths here.
    if (url.pathname !== "/" && url.pathname.endsWith("/")) {
      const redirectTo = new URL(url.pathname.replace(/\/+$/, "") + url.search, url.origin);
      return Response.redirect(redirectTo.toString(), 301);
    }

    // /blog/:slug and /blog/:slug.md — two path segments under /blog/
    const isBlogRoute = url.pathname.startsWith("/blog/") && url.pathname.split("/").length === 3;
    if (isBlogRoute) {
      if (url.pathname.endsWith(".md")) {
        const canonicalUrl = url.origin + url.pathname.replace(/\.md$/, "");
        const md = await serveMarkdown(env, url.href, canonicalUrl);
        if (md) return md;
      } else if (acceptsMarkdown(request)) {
        const md = await serveMarkdown(env, `${url.href}.md`, url.href);
        if (md) return md;
      }
    }

    // Wrangler's generated ambient types and @cloudflare/workers-types (which
    // handle()'s declaration uses) describe the same runtime but clash
    // structurally — cast across the boundary.
    return handle(manifest, app, request as any, env as any, context as any);
  };

  return { default: { fetch } };
}
