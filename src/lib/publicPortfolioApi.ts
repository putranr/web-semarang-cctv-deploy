import {
  API_URL,
} from './api';

export type PublicPortfolio = {
  id: number;
  title: string;
  category: string;
  location: string;
  cameras: number;
  year: number;
  image: string | null;
  description: string;
  isPublished: boolean;
};

export async function fetchPublicPortfolio(
  category = '',
  limit = 3,
) {
  const params =
    new URLSearchParams();

  params.set(
    'limit',
    String(limit),
  );

  if (
    category &&
    category !== 'Semua'
  ) {
    params.set(
      'category',
      category,
    );
  }

  const response =
    await fetch(
      `${API_URL}/public/portfolio?${params.toString()}`,
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      Array.isArray(data.message)
        ? data.message.join(
            ', ',
          )
        : data.message ??
            'Gagal mengambil portfolio',
    );
  }

  return data as PublicPortfolio[];
}

export function getPortfolioImageUrl(
  image:
    | string
    | null
    | undefined,
) {
  if (!image) {
    return null;
  }

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

  return `${API_URL}${
    image.startsWith('/')
      ? image
      : `/${image}`
  }`;
}