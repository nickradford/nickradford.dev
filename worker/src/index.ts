/**
 * Intercepts blog page requests and returns the markdown version if
 * the Accept header contains `text/markdown`
 */
export default {
	async fetch(request): Promise<Response> {
		const url = new URL(request.url);

		const isBlogRoute = url.pathname.startsWith('/blog/') && url.pathname.split('/').length === 3;

		if (!isBlogRoute) {
			return fetch(request);
		}

		const accept = request.headers.get('Accept') || '';
		const acceptsMarkdown = accept.split(',').some((entry) => entry.trim().toLowerCase().startsWith('text/markdown'));

		if (!acceptsMarkdown) {
			return fetch(request);
		}

		const mdUrl = `${url.href}.md`;

		const headers = new Headers(request.headers);

		const req = new Request(mdUrl.toString(), {
			headers,
			method: request.method,
			body: request.body,
			redirect: request.redirect,
		});

		return fetch(req);
	},
} satisfies ExportedHandler<Env>;
