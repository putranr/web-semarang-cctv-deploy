// ======================================================
// PUBLIC BUSINESS PARTNERS API
// ======================================================

const API_URL =
  import.meta.env.VITE_API_URL ??
  'http://localhost:3000';

// ======================================================
// TYPE
// ======================================================

export type PublicBusinessPartner = {
  id: number;

  image: string | null;

  isPublished: boolean;
};

// ======================================================
// GET PUBLIC BUSINESS PARTNERS
// ======================================================

export async function getPublicBusinessPartners(): Promise<
  PublicBusinessPartner[]
> {
  const response =
    await fetch(
      `${API_URL}/public/business-partners`,
    );

  if (!response.ok) {
    throw new Error(
      'Gagal mengambil data mitra bisnis.',
    );
  }

  return (
    (await response.json()) as PublicBusinessPartner[]
  );
}

// ======================================================
// IMAGE URL
// ======================================================

export function getBusinessPartnerImageUrl(
  image: string | null,
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

  return `${API_URL}${image}`;
}