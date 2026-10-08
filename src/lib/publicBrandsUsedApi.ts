// ======================================================
// PUBLIC USED PRODUCTS API
// ======================================================

const API_URL =
  import.meta.env.VITE_API_URL ??
  'http://localhost:3000';

// ======================================================
// TYPE
// ======================================================

export type PublicUsedProduct = {
  id: number;

  name: string;

  productName: string;

  category: string;

  productImage: string | null;

  description: string;

  isPublished: boolean;
};

// ======================================================
// GET PUBLIC USED PRODUCTS
// ======================================================

export async function getPublicUsedBrands(): Promise<
  PublicUsedProduct[]
> {
  const response =
    await fetch(
      `${API_URL}/public/brands-used`,
    );

  if (!response.ok) {
    throw new Error(
      'Gagal mengambil data produk.',
    );
  }

  const data =
    (await response.json()) as PublicUsedProduct[];

  return data;
}

// ======================================================
// GET PRODUCT IMAGE URL
// ======================================================
//
// Database:
//
// /uploads/brand-products/xxxx.png
//
// Browser:
//
// http://localhost:3000/uploads/brand-products/xxxx.png
// ======================================================

export function getUsedProductImageUrl(
  image: string | null,
) {
  if (!image) {
    return null;
  }

  // Kalau sudah URL lengkap
  if (
    image.startsWith(
      'http://',
    ) ||
    image.startsWith(
      'https://',
    )
  ) {
    return image;
  }

  return `${API_URL}${image}`;
}