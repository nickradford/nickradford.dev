const { NEXT_PUBLIC_VERCEL_URL: Vercel, NEXT_PUBLIC_BASE_URL: Base } =
  process.env;

export const BASE_URL = Base
  ? Base
  : Vercel
  ? `https://${Vercel}`
  : `http://localhost:3000`;

console.info("BASE_URL", BASE_URL);
