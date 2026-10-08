import {
  API_URL,
} from './api';

export type PublicService = {
  id: number;
  title: string;
  description: string;
  detail: string;
  features: string[];
  icon: string;
  displayOrder: number;
  isPublished: boolean;
};

export async function fetchPublicServices() {
  const response =
    await fetch(
      `${API_URL}/public/services`,
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
            'Gagal mengambil layanan',
    );
  }

  return data as PublicService[];
}