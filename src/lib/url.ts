export const BASE_URL = import.meta.env.PUBLIC_BASE_URL
  ? import.meta.env.PUBLIC_BASE_URL
  : import.meta.env.PUBLIC_VERCEL_URL
    ? `https://${import.meta.env.PUBLIC_VERCEL_URL}`
    : `http://localhost:4321`;

console.info("BASE_URL", BASE_URL);
