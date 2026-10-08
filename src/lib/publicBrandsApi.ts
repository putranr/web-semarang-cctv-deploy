// ======================================================
// PUBLIC BRAND API
// ======================================================
//
// File ini khusus untuk mengambil data Brand Partner
// dari backend public API.
//
// Endpoint:
//
// GET /public/brands
//
// Endpoint ini TIDAK membutuhkan login.
// ======================================================

const API_URL =
  import.meta.env.VITE_API_URL ??
  'http://localhost:3000';

// ======================================================
// TYPE
// ======================================================

export type PublicBrand = {
  id: number;

  name: string;

  logo: string | null;

  website: string | null;

  description: string;

  isPublished: boolean;
};

// ======================================================
// GET PUBLIC BRANDS
// ======================================================

export async function getPublicBrands(): Promise<
  PublicBrand[]
> {
  // ----------------------------------------------------
  // Request ke backend
  // ----------------------------------------------------

  const response =
    await fetch(
      `${API_URL}/public/brands`,
    );

  // ----------------------------------------------------
  // Cek response
  // ----------------------------------------------------

  if (!response.ok) {
    throw new Error(
      'Gagal mengambil data Brand Partner.',
    );
  }

  // ----------------------------------------------------
  // Ambil JSON
  // ----------------------------------------------------

  const data =
    (await response.json()) as PublicBrand[];

  return data;
}

// ======================================================
// HELPER LOGO URL
// ======================================================
//
// Database hanya menyimpan:
//
// /uploads/brands/abc.png
//
// Sedangkan browser membutuhkan:
//
// http://localhost:3000/uploads/brands/abc.png
// ======================================================

export function getBrandLogoUrl(
  logo: string | null,
) {
  if (!logo) {
    return null;
  }

  // Kalau URL sudah absolute
  // jangan tambahkan API_URL lagi.
  if (
    logo.startsWith('http://') ||
    logo.startsWith('https://')
  ) {
    return logo;
  }

  return `${API_URL}${logo}`;
}