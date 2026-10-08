import { API_URL } from './api';

/**
 * Mengubah path gambar dari backend
 * menjadi URL yang bisa digunakan browser.
 *
 * Contoh:
 *
 * /uploads/articles/a.jpg
 *
 * menjadi:
 *
 * http://localhost:3000/uploads/articles/a.jpg
 */
export function getArticleImageUrl(
  image:
    | string
    | null
    | undefined,
) {
  if (!image) {
    return null;
  }

  /**
   * Kalau sudah URL absolut,
   * gunakan langsung.
   */
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

  /**
   * Pastikan ada "/" di antara
   * API_URL dan path.
   */
  const normalizedPath =
    image.startsWith('/')
      ? image
      : `/${image}`;

  return `${API_URL}${normalizedPath}`;
}

/**
 * Bentuk data artikel yang diterima
 * dari API publik.
 */
export type PublicArticle = {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string | null;
  publishedAt: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

/**
 * Parameter yang bisa dikirim
 * ke endpoint publik.
 */
export type PublicArticleParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?:
    | 'newest'
    | 'oldest'
    | 'title-asc'
    | 'title-desc';
};

/**
 * Response dari backend.
 */
export type PublicArticlesResponse = {
  data: PublicArticle[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

/**
 * Mengambil artikel dari API publik.
 */
export async function fetchPublicArticles(
  params: PublicArticleParams = {},
): Promise<PublicArticlesResponse> {
  /**
   * URLSearchParams membantu kita membuat
   * query string secara aman.
   */
  const searchParams =
    new URLSearchParams();

  /**
   * Hanya kirim parameter yang tersedia.
   */
  if (params.page !== undefined) {
    searchParams.set(
      'page',
      String(params.page),
    );
  }

  if (params.limit !== undefined) {
    searchParams.set(
      'limit',
      String(params.limit),
    );
  }

  if (params.search?.trim()) {
    searchParams.set(
      'search',
      params.search.trim(),
    );
  }

  if (params.category?.trim()) {
    searchParams.set(
      'category',
      params.category.trim(),
    );
  }

  if (params.sort) {
    searchParams.set(
      'sort',
      params.sort,
    );
  }

  const queryString =
    searchParams.toString();

  const url =
    queryString.length > 0
      ? `${API_URL}/public/articles?${queryString}`
      : `${API_URL}/public/articles`;

  const response =
    await fetch(url);

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      Array.isArray(data.message)
        ? data.message.join(', ')
        : data.message ??
            'Gagal mengambil artikel',
    );
  }

  return data;
}

/**
 * Mengubah timestamp dari API
 * menjadi format tanggal Indonesia.
 */
export function formatArticleDate(
  date: string,
) {
  return new Date(
    date,
  ).toLocaleDateString(
    'id-ID',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    },
  );
}