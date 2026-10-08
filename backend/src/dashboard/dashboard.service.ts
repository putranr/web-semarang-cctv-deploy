import {
  Injectable,
} from '@nestjs/common';

import {
  PrismaService,
} from '../prisma.service.js';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =====================================================
  // DASHBOARD SUMMARY
  // =====================================================
  //
  // Mengambil jumlah data dari seluruh content
  // yang tersedia di sistem.
  //
  // Kita mengambil data menggunakan API Prisma 8
  // yang sudah dipakai di project ini:
  //
  // db.orm.public.Model.all()
  //
  // Kemudian jumlah data dihitung menggunakan length.
  // =====================================================

  async getSummary() {
    // ---------------------------------------------------
    // Ambil seluruh data yang diperlukan.
    //
    // Promise.all digunakan supaya request database
    // dapat dijalankan secara paralel.
    // ---------------------------------------------------

    const [
      articles,
      portfolios,
      services,
      brands,
      businessPartners,
    ] = await Promise.all([
      this.prisma.db.orm.public.Article
        .all(),

      this.prisma.db.orm.public.Portfolio
        .all(),

      this.prisma.db.orm.public.Service
        .all(),

      this.prisma.db.orm.public.Brand
        .all(),

      this.prisma.db.orm.public.BusinessPartner
        .all(),
    ]);

    // ---------------------------------------------------
    // Pisahkan Brand Partner dan Brand Used
    // ---------------------------------------------------

    const brandPartners =
      brands.filter(
        (brand) =>
          brand.type === 'partner',
      );

    const usedProducts =
      brands.filter(
        (brand) =>
          brand.type === 'used',
      );

    // ---------------------------------------------------
    // Return data untuk frontend
    // ---------------------------------------------------

    return {
      // ================================================
      // ARTIKEL
      // ================================================

      articles: {
        total:
          articles.length,

        published:
          articles.filter(
            (article) =>
              article.isPublished ===
              true,
          ).length,
      },

      // ================================================
      // PORTFOLIO
      // ================================================

      portfolios: {
        total:
          portfolios.length,

        published:
          portfolios.filter(
            (portfolio) =>
              portfolio.isPublished ===
              true,
          ).length,
      },

      // ================================================
      // SERVICES
      // ================================================

      services: {
        total:
          services.length,

        published:
          services.filter(
            (service) =>
              service.isPublished ===
              true,
          ).length,
      },

      // ================================================
      // BRAND PARTNER
      // ================================================

      brandPartners: {
        total:
          brandPartners.length,

        published:
          brandPartners.filter(
            (brand) =>
              brand.isPublished ===
              true,
          ).length,
      },

      // ================================================
      // USED PRODUCTS
      // ================================================

      usedProducts: {
        total:
          usedProducts.length,

        published:
          usedProducts.filter(
            (product) =>
              product.isPublished ===
              true,
          ).length,
      },

      // ================================================
      // BUSINESS PARTNERS
      // ================================================

      businessPartners: {
        total:
          businessPartners.length,

        published:
          businessPartners.filter(
            (partner) =>
              partner.isPublished ===
              true,
          ).length,
      },

      // ================================================
      // TIMESTAMP
      // ================================================

      generatedAt:
        new Date().toISOString(),
    };
  }
}