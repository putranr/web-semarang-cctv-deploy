// ======================================================
// ADMIN DASHBOARD API
// ======================================================

import {
  authFetch,
} from './api';

// ======================================================
// TYPE
// ======================================================

export type DashboardMetric = {
  total: number;

  published: number;
};

export type DashboardSummary = {
  articles: DashboardMetric;

  portfolios: DashboardMetric;

  services: DashboardMetric;

  brandPartners: DashboardMetric;

  usedProducts: DashboardMetric;

  businessPartners: DashboardMetric;

  generatedAt: string;
};

// ======================================================
// GET DASHBOARD
// ======================================================

export async function getDashboardSummary(): Promise<
  DashboardSummary
> {
  const response =
    await authFetch(
      '/admin/dashboard',
      {
        method: 'GET',
      },
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      Array.isArray(
        data.message,
      )
        ? data.message.join(
            ', ',
          )
        : data.message ??
            'Gagal mengambil data dashboard.',
    );
  }

  return data as DashboardSummary;
}