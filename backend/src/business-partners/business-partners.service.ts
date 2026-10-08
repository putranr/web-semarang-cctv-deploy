import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  PrismaService,
} from '../prisma.service.js';

import {
  BrandFilesService,
} from '../brands/brand-files.service.js';

import {
  CreateBusinessPartnerDto,
} from './dto/create-business-partner.dto.js';

import {
  UpdateBusinessPartnerDto,
} from './dto/update-business-partner.dto.js';

@Injectable()
export class BusinessPartnersService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly brandFiles: BrandFilesService,
  ) {}

  // =====================================================
  // GET ALL
  // =====================================================

  async findAll() {
    return this.prisma.db.orm.public.BusinessPartner
      .orderBy(
        (partner) =>
          partner.createdAt.desc(),
      )
      .all();
  }

  // =====================================================
  // GET ONE
  // =====================================================

  async findOne(
    id: number,
  ) {
    const partner =
      await this.prisma.db.orm.public.BusinessPartner.first({
        id,
      });

    if (!partner) {
      throw new NotFoundException(
        'Mitra bisnis tidak ditemukan.',
      );
    }

    return partner;
  }

  // =====================================================
  // CREATE
  // =====================================================

  async create(
    dto: CreateBusinessPartnerDto,
    file?: Express.Multer.File,
  ) {
    // ---------------------------------------------------
    // Gambar wajib
    // ---------------------------------------------------

    if (!file) {
      throw new Error(
        'Gambar mitra bisnis wajib diupload.',
      );
    }

    // ---------------------------------------------------
    // Simpan gambar
    // ---------------------------------------------------

    const image =
      await this.brandFiles.save(
        {
          buffer:
            file.buffer,

          mimetype:
            file.mimetype,
        },

        'business-partners',
      );

    try {
      // -------------------------------------------------
      // Simpan database
      // -------------------------------------------------

      return await this.prisma.db.orm.public.BusinessPartner.create({
        image,

        isPublished:
          dto.isPublished ??
          true,
      });
    } catch (error) {
      // -------------------------------------------------
      // Kalau DB gagal, hapus file
      // -------------------------------------------------

      await this.brandFiles.remove(
        image,
      );

      throw error;
    }
  }

  // =====================================================
  // UPDATE
  // =====================================================

  async update(
    id: number,
    dto: UpdateBusinessPartnerDto,
    file?: Express.Multer.File,
  ) {
    // ---------------------------------------------------
    // Cari data lama
    // ---------------------------------------------------

    const existing =
      await this.findOne(id);

    let newImage:
      string | null = null;

    // ---------------------------------------------------
    // Upload gambar baru kalau ada
    // ---------------------------------------------------

    if (file) {
      newImage =
        await this.brandFiles.save(
          {
            buffer:
              file.buffer,

            mimetype:
              file.mimetype,
          },

          'business-partners',
        );
    }

    try {
      // -------------------------------------------------
      // Data update
      // -------------------------------------------------

      const data: {
        image?: string;

        isPublished?: boolean;
      } = {};

      if (newImage) {
        data.image =
          newImage;
      }

      if (
        dto.isPublished !==
        undefined
      ) {
        data.isPublished =
          dto.isPublished;
      }

      // -------------------------------------------------
      // UPDATE PRISMA 8
      // -------------------------------------------------

      const updated =
        await this.prisma.db.orm.public.BusinessPartner
          .where({
            id,
          })
          .update(data);

      if (!updated) {
        throw new NotFoundException(
          'Mitra bisnis tidak ditemukan.',
        );
      }

      // -------------------------------------------------
      // Hapus gambar lama
      // -------------------------------------------------

      if (
        newImage &&
        existing.image
      ) {
        await this.brandFiles.remove(
          existing.image,
        );
      }

      return updated;
    } catch (error) {
      // -------------------------------------------------
      // Kalau gagal:
      // gambar baru dibuang
      // -------------------------------------------------

      if (newImage) {
        await this.brandFiles.remove(
          newImage,
        );
      }

      throw error;
    }
  }

  // =====================================================
  // DELETE
  // =====================================================

  async remove(
    id: number,
  ) {
    const existing =
      await this.findOne(id);

    const deleted =
      await this.prisma.db.orm.public.BusinessPartner
        .where({
          id,
        })
        .delete();

    if (!deleted) {
      throw new NotFoundException(
        'Mitra bisnis tidak ditemukan.',
      );
    }

    // ---------------------------------------------------
    // Hapus file
    // ---------------------------------------------------

    if (existing.image) {
      await this.brandFiles.remove(
        existing.image,
      );
    }

    return deleted;
  }

  // =====================================================
  // PUBLIC
  // =====================================================

  async findPublic() {
    return this.prisma.db.orm.public.BusinessPartner
      .where({
        isPublished: true,
      })
      .orderBy(
        (partner) =>
          partner.createdAt.asc(),
      )
      .all();
  }
}