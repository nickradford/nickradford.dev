/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GITHUB_TOKEN?: string;
  readonly PUBLIC_BASE_URL?: string;
  readonly PUBLIC_VERCEL_URL?: string;
}
