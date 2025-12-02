const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const INTERNAL_API_URL = process.env.INTERNAL_API_URL;

export const getApiBaseUrl = () => {
  // SSR
  if (typeof window === "undefined") {
    return INTERNAL_API_URL;
  }

  // CSR
  return PUBLIC_API_URL;
};

export async function apiFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const base = getApiBaseUrl();
  const url = `${base}${path}`;
  return fetch(url, init);
}
