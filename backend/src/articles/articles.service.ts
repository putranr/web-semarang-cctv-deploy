import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { or } from '@prisma/orm-postgres/orm-client';

import type { Express } from 'express';

import { PrismaService } from '../prisma.service.js';

import { ArticleFilesService } from './article-files.service.js';

import {
  CreateArticleDto,
} from './dto/create-article.dto.js';

import {
  UpdateArticleDto,
} from './dto/update-article.dto.js';

import {
  PublicArticlesQueryDto,
} from './dto/public-articles-query.dto.js';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly articleFiles:
      ArticleFilesService,
  ) {}

  /**
   * ==================================================
   * GET ALL ADMIN ARTICLES
   * ==================================================
   */
  async findAll() {
    return this.prisma.db.orm.public.Article
      .orderBy(
        (article) =>
          article.createdAt.desc(),
      )
      .all();
  }

  /**
   * ==================================================
   * GET ONE ARTICLE
   * ==================================================
   */
  async findOne(id: number) {
    const article =
      await this.prisma.db.orm.public.Article.first({
        id,
      });

    if (!article) {
      throw new NotFoundException(
        'Artikel tidak ditemukan',
      );
    }

    return article;
  }

  /**
   * ==================================================
   * CREATE ARTICLE
   * ==================================================
   */
  async create(
    dto: CreateArticleDto,
    file?: Express.Multer.File,
  ) {
    /**
     * Cek slug sebelum membuat article.
     */
    const existing =
      await this.prisma.db.orm.public.Article.first({
        slug: dto.slug,
      });

    if (existing) {
      throw new ConflictException(
        'Slug artikel sudah digunakan',
      );
    }

    /**
     * Path gambar yang akan dimasukkan
     * ke database.
     */
    let imagePath:
      | string
      | null = null;

    /**
     * Simpan file terlebih dahulu
     * kalau admin memilih gambar.
     */
    if (file) {
      imagePath =
        await this.articleFiles.save(
          file,
        );
    }

    try {
      /**
       * Buat data article.
       */
      return await this.prisma.db.orm.public.Article.create(
        {
          title: dto.title,
          slug: dto.slug,
          category:
            dto.category,
          excerpt:
            dto.excerpt,
          content:
            dto.content,
          image: imagePath,
          isPublished:
            dto.isPublished ??
            true,
        },
      );
    } catch (error) {
      /**
       * Kalau database gagal membuat
       * artikel, file baru dihapus supaya
       * tidak meninggalkan file yatim.
       */
      if (imagePath) {
        await this.articleFiles.remove(
          imagePath,
        );
      }

      throw error;
    }
  }

  /**
   * ==================================================
   * UPDATE ARTICLE
   * ==================================================
   */
  async update(
    id: number,
    dto: UpdateArticleDto,
    file?: Express.Multer.File,
  ) {
    const existing =
      await this.prisma.db.orm.public.Article.first({
        id,
      });

    if (!existing) {
      throw new NotFoundException(
        'Artikel tidak ditemukan',
      );
    }

    /**
     * Kalau slug diubah,
     * pastikan tidak bentrok dengan
     * artikel lain.
     */
    if (
      dto.slug &&
      dto.slug !== existing.slug
    ) {
      const slugOwner =
        await this.prisma.db.orm.public.Article.first({
          slug: dto.slug,
        });

      if (
        slugOwner &&
        slugOwner.id !== id
      ) {
        throw new ConflictException(
          'Slug artikel sudah digunakan',
        );
      }
    }

    /**
     * Gambar baru.
     */
    let newImagePath:
      | string
      | null = null;

    /**
     * Kalau admin memilih gambar baru,
     * simpan dulu.
     */
    if (file) {
      newImagePath =
        await this.articleFiles.save(
          file,
        );
    }

    try {
      /**
       * Data yang akan diupdate.
       */
      const updateData: Record<
        string,
        unknown
      > = {
        ...dto,
      };

      /**
       * Kalau ada gambar baru,
       * ganti image.
       */
      if (newImagePath) {
        updateData.image =
          newImagePath;
      }

      /**
       * Update database.
       */
      const updated =
        await this.prisma.db.orm.public.Article
          .where({ id })
          .update(updateData);

      /**
       * Setelah DB berhasil,
       * hapus gambar lama.
       */
      if (
        newImagePath &&
        existing.image
      ) {
        await this.articleFiles.remove(
          existing.image,
        );
      }

      return updated;
    } catch (error) {
      /**
       * Kalau update gagal,
       * hapus gambar baru supaya tidak
       * meninggalkan file yatim.
       */
      if (newImagePath) {
        await this.articleFiles.remove(
          newImagePath,
        );
      }

      throw error;
    }
  }
    /**
   * ==================================================
   * DELETE ARTICLE
   * ==================================================
   */
  async remove(id: number) {
    /**
     * Cari artikel terlebih dahulu
     * untuk memastikan artikel memang ada
     * dan untuk mendapatkan path gambar lama.
     */
    const existing =
      await this.prisma.db.orm.public.Article.first({
        id,
      });

    if (!existing) {
      throw new NotFoundException(
        'Artikel tidak ditemukan',
      );
    }

    /**
     * Hapus artikel dari database.
     */
    await this.prisma.db.orm.public.Article
      .where({ id })
      .delete();

    /**
     * Kalau artikel mempunyai gambar,
     * hapus juga file gambarnya.
     */
    if (existing.image) {
      await this.articleFiles.remove(
        existing.image,
      );
    }

    /**
     * Response berhasil.
     */
    return {
      message: 'Artikel berhasil dihapus',
      id,
    };
  }

  /**
   * ==================================================
   * PUBLIC ARTICLES
   * ==================================================
   */
  async findPublic(
    query: PublicArticlesQueryDto,
  ) {
    const page =
      query.page ?? 1;

    const limit = Math.min(
      query.limit ?? 3,
      12,
    );

    const offset =
      (page - 1) * limit;

    /**
     * Membuat query dasar.
     */
    const buildQuery = () => {
      let articleQuery =
        this.prisma.db.orm.public.Article
          .where({
            isPublished: true,
          });

      /**
       * Filter kategori.
       */
      const category =
        query.category?.trim();

      if (category) {
        articleQuery =
          articleQuery.where({
            category,
          });
      }

      /**
       * Search judul / excerpt.
       */
      const search =
        query.search?.trim();

      if (search) {
        const escapedSearch =
          search.replace(
            /[\\%_]/g,
            '\\$&',
          );

        const pattern =
          `%${escapedSearch}%`;

        articleQuery =
          articleQuery.where(
            (article) =>
              or(
                article.title.ilike(
                  pattern,
                ),

                article.excerpt.ilike(
                  pattern,
                ),
              ),
          );
      }

      return articleQuery;
    };

    /**
     * Total data.
     */
    const totalResult =
      await buildQuery().aggregate(
        (aggregate) => ({
          total: aggregate.count(),
        }),
      );

    const total =
      totalResult.total;

    /**
     * Sorting.
     */
    let dataQuery =
      buildQuery();

    switch (query.sort) {
      case 'oldest':
        dataQuery =
          dataQuery.orderBy([
            (article) =>
              article.publishedAt.asc(),

            (article) =>
              article.id.asc(),
          ]);
        break;

      case 'title-asc':
        dataQuery =
          dataQuery.orderBy([
            (article) =>
              article.title.asc(),

            (article) =>
              article.id.asc(),
          ]);
        break;

      case 'title-desc':
        dataQuery =
          dataQuery.orderBy([
            (article) =>
              article.title.desc(),

            (article) =>
              article.id.desc(),
          ]);
        break;

      case 'newest':
      default:
        dataQuery =
          dataQuery.orderBy([
            (article) =>
              article.publishedAt.desc(),

            (article) =>
              article.id.desc(),
          ]);
        break;
    }

    /**
     * Pagination dilakukan di database.
     */
    const data =
      await dataQuery
        .limit(limit)
        .offset(offset)
        .all();

    const totalPages =
      Math.ceil(
        total / limit,
      );

    return {
      data,

      meta: {
        page,
        limit,
        total,
        totalPages,

        hasNextPage:
          page < totalPages,

        hasPreviousPage:
          page > 1,
      },
    };
  }
}