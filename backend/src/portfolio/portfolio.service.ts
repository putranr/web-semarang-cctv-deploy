import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Express } from 'express';

import { PrismaService } from '../prisma.service.js';

import {
  CreatePortfolioDto,
} from './dto/create-portfolio.dto.js';

import {
  UpdatePortfolioDto,
} from './dto/update-portfolio.dto.js';

import {
  PortfolioFilesService,
} from './portfolio-files.service.js';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly files:
      PortfolioFilesService,
  ) {}

  /**
   * ==============================
   * ADMIN: GET ALL
   * ==============================
   */
  async findAll() {
    return this.prisma.db.orm.public.Portfolio
      .orderBy([
        (portfolio) =>
          portfolio.year.desc(),

        (portfolio) =>
          portfolio.id.desc(),
      ])
      .all();
  }

  /**
   * ==============================
   * GET ONE
   * ==============================
   */
  async findOne(id: number) {
    const portfolio =
      await this.prisma.db.orm.public.Portfolio.first({
        id,
      });

    if (!portfolio) {
      throw new NotFoundException(
        'Portfolio tidak ditemukan',
      );
    }

    return portfolio;
  }

  /**
   * ==============================
   * CREATE
   * ==============================
   */
  async create(
    dto: CreatePortfolioDto,
    file?: Express.Multer.File,
  ) {
    let imagePath:
      | string
      | null = null;

    if (file) {
      imagePath =
        await this.files.save(file);
    }

    try {
      return await this.prisma.db.orm.public.Portfolio.create({
        title: dto.title,
        category: dto.category,
        location: dto.location,
        cameras: dto.cameras,
        year: dto.year,
        image: imagePath,
        description:
          dto.description,
        isPublished:
          dto.isPublished ??
          true,
      });
    } catch (error) {
      if (imagePath) {
        await this.files.remove(
          imagePath,
        );
      }

      throw error;
    }
  }

  /**
   * ==============================
   * UPDATE
   * ==============================
   */
  async update(
    id: number,
    dto: UpdatePortfolioDto,
    file?: Express.Multer.File,
  ) {
    const existing =
      await this.prisma.db.orm.public.Portfolio.first({
        id,
      });

    if (!existing) {
      throw new NotFoundException(
        'Portfolio tidak ditemukan',
      );
    }

    let newImagePath:
      | string
      | null = null;

    if (file) {
      newImagePath =
        await this.files.save(file);
    }

    try {
      const updateData: Record<
        string,
        unknown
      > = {
        ...dto,
      };

      if (newImagePath) {
        updateData.image =
          newImagePath;
      }

      const updated =
        await this.prisma.db.orm.public.Portfolio
          .where({ id })
          .update(updateData);

      /**
       * Gambar lama dihapus setelah
       * database berhasil di-update.
       */
      if (
        newImagePath &&
        existing.image
      ) {
        await this.files.remove(
          existing.image,
        );
      }

      return updated;
    } catch (error) {
      if (newImagePath) {
        await this.files.remove(
          newImagePath,
        );
      }

      throw error;
    }
  }

  /**
   * ==============================
   * DELETE
   * ==============================
   */
    /**
   * ==============================
   * DELETE
   * ==============================
   */
  async remove(id: number) {
    /**
     * Cari portfolio terlebih dahulu.
     * Kita juga membutuhkan image lama
     * jika portfolio mempunyai gambar.
     */
    const existing =
      await this.prisma.db.orm.public.Portfolio.first({
        id,
      });

    /**
     * Kalau portfolio tidak ditemukan.
     */
    if (!existing) {
      throw new NotFoundException(
        'Portfolio tidak ditemukan',
      );
    }

    /**
     * Hapus data portfolio dari database.
     */
    await this.prisma.db.orm.public.Portfolio
      .where({ id })
      .delete();

    /**
     * Setelah database berhasil dihapus,
     * hapus juga file gambar jika ada.
     */
    if (existing.image) {
      await this.files.remove(
        existing.image,
      );
    }

    /**
     * Response berhasil.
     */
    return {
      message: 'Portfolio berhasil dihapus',
      id,
    };
  }

  /**
   * ==============================
   * PUBLIC
   * ==============================
   */
  async findPublic(
    category?: string,
    limit = 3,
  ) {
    let query =
      this.prisma.db.orm.public.Portfolio
        .where({
          isPublished: true,
        });

    if (
      category?.trim() &&
      category !== 'Semua'
    ) {
      query =
        query.where({
          category:
            category.trim(),
        });
    }

    return query
      .orderBy([
        (portfolio) =>
          portfolio.year.desc(),

        (portfolio) =>
          portfolio.id.desc(),
      ])
      .limit(
        Math.min(limit, 12),
      )
      .all();
  }
}