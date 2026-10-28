import {
  clearAuth,
  getToken,
} from '../admin/auth';

/**
 * URL dasar backend.
 */
export const API_URL =
  import.meta.env.VITE_API_URL ??
  'http://localhost:3000';

/**
 * Menghasilkan URL gambar yang bisa ditampilkan browser.
 * URL Cloudinary digunakan langsung.
 * Path lokal lama tetap diarahkan ke backend.
 */
export function getAssetUrl(
  path: string | null | undefined,
): string | null {
  if (!path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/')
    ? path
    : `/${path}`;

  return `${API_URL}${normalizedPath}`;
}
/**
 * Request ke API yang membutuhkan JWT.
 *
 * Bisa digunakan untuk:
 *
 * 1. JSON
 * 2. FormData + file
 */
export async function authFetch(
  path: string,
  options: RequestInit = {},
) {
  const token = getToken();

  /**
   * Gunakan Headers object.
   */
  const headers =
    new Headers(
      options.headers,
    );

  /**
   * Jika body bukan FormData,
   * gunakan JSON.
   *
   * Jika body adalah FormData,
   * JANGAN menentukan Content-Type
   * sendiri.
   */
  if (
    !(options.body instanceof FormData) &&
    !headers.has(
      'Content-Type',
    )
  ) {
    headers.set(
      'Content-Type',
      'application/json',
    );
  }

  /**
   * Tambahkan JWT.
   */
  if (token) {
    headers.set(
      'Authorization',
      `Bearer ${token}`,
    );
  }

  const response =
    await fetch(
      `${API_URL}${path}`,
      {
        ...options,
        headers,
      },
    );

  /**
   * Token expired / invalid.
   */
  if (
    response.status === 401
  ) {
    clearAuth();

    window.location.href =
      '/admin/login';

    throw new Error(
      'Sesi admin sudah berakhir',
    );
  }

  return response;
}