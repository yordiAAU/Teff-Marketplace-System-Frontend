/** Single source of truth for the API base URL. Override via VITE_API_URL in .env for local dev. */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "https://teff-market-system.onrender.com";
