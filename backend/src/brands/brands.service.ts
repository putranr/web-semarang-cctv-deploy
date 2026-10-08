import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  PrismaService,
} from '../prisma.service.js';

import {
  BrandFilesService,
} from './brand-files.service.js';

import {
  CreateBrandDto,
} from './dto/create-brand.dto.js';

import {
  UpdateBrandDto,
} from './dto/update-brand.dto.js';

import {
  CreateUsedBrandDto,
} from './dto/create-used-brand.dto.js';

import {
  UpdateUsedBrandDto,
} from './dto/update-used-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly brandFiles: BrandFilesService,
  ) {}

  // =====================================================
  // ================= BRAND PARTNER =====================
  // =====================================================

  async findPartners() {
    return this.prisma.db.orm.public.Brand
      .where({
        type: 'partner',
      })
      .orderBy(
        (brand) =>
          brand.createdAt.desc(),
      )
      .all();
  }

  // =====================================================

  async findPartner(id: number) {
    const brand =
      await this.prisma.db.orm.public.Brand.first({
        id,
        type: 'partner',
      });

    if (!brand) {
      throw new NotFoundException(
        'Brand Partner tidak ditemukan.',
      );
    }

    return brand;
  }

  // =====================================================

  async createPartner(
    dto: CreateBrandDto,
    file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Logo Brand Partner wajib diupload.',
      );
    }

    const logo =
      await this.brandFiles.save(
        {
          buffer: file.buffer,
          mimetype: file.mimetype,
        },
        'brands',
      );

    try {
      return await this.prisma.db.orm.public.Brand.create({
        type: 'partner',

        name: null,

        logo,

        productName: null,

        category: null,

        productImage: null,

        description: '',

        website: null,

        isPublished:
          dto.isPublished ??
          true,
      });
    } catch (error) {
      await this.brandFiles.remove(
        logo,
      );

      throw error;
    }
  }

  // =====================================================

  async updatePartner(
    id: number,
    dto: UpdateBrandDto,
    file?: Express.Multer.File,
  ) {
    const existing =
      await this.findPartner(id);

    let newLogo:
      string | null = null;

    if (file) {
      newLogo =
        await this.brandFiles.save(
          {
            buffer: file.buffer,
            mimetype: file.mimetype,
          },
          'brands',
        );
    }

    try {
      const data: {
        logo?: string;
        isPublished?: boolean;
      } = {};

      if (newLogo) {
        data.logo =
          newLogo;
      }

      if (
        dto.isPublished !==
        undefined
      ) {
        data.isPublished =
          dto.isPublished;
      }

      const updated =
        await this.prisma.db.orm.public.Brand
          .where({
            id,
            type: 'partner',
          })
          .update(data);

      if (!updated) {
        throw new NotFoundException(
          'Brand Partner tidak ditemukan.',
        );
      }

      if (
        newLogo &&
        existing.logo
      ) {
        await this.brandFiles.remove(
          existing.logo,
        );
      }

      return updated;
    } catch (error) {
      if (newLogo) {
        await this.brandFiles.remove(
          newLogo,
        );
      }

      throw error;
    }
  }

  // =====================================================

  async deletePartner(
    id: number,
  ) {
    const existing =
      await this.findPartner(id);

    const deleted =
      await this.prisma.db.orm.public.Brand
        .where({
          id,
          type: 'partner',
        })
        .delete();

    if (!deleted) {
      throw new NotFoundException(
        'Brand Partner tidak ditemukan.',
      );
    }

    if (existing.logo) {
      await this.brandFiles.remove(
        existing.logo,
      );
    }

    return deleted;
  }

  // =====================================================
  // ==================== USED PRODUCT ===================
  // =====================================================

  async findUsed() {
    return this.prisma.db.orm.public.Brand
      .where({
        type: 'used',
      })
      .orderBy(
        (brand) =>
          brand.createdAt.desc(),
      )
      .all();
  }

  // =====================================================

  async findUsedOne(
    id: number,
  ) {
    const product =
      await this.prisma.db.orm.public.Brand.first({
        id,
        type: 'used',
      });

    if (!product) {
      throw new NotFoundException(
        'Produk tidak ditemukan.',
      );
    }

    return product;
  }

  // =====================================================

  async createUsed(
    dto: CreateUsedBrandDto,
    file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Gambar produk wajib diupload.',
      );
    }

    const productImage =
      await this.brandFiles.save(
        {
          buffer: file.buffer,
          mimetype: file.mimetype,
        },
        'brand-products',
      );

    try {
      return await this.prisma.db.orm.public.Brand.create({
        type: 'used',

        name:
          dto.name.trim(),

        productName:
          dto.productName.trim(),

        category:
          dto.category.trim(),

        productImage,

        logo: null,

        website: null,

        description:
          dto.description?.trim() ??
          '',

        isPublished:
          dto.isPublished ??
          true,
      });
    } catch (error) {
      await this.brandFiles.remove(
        productImage,
      );

      throw error;
    }
  }

  // =====================================================

  async updateUsed(
    id: number,
    dto: UpdateUsedBrandDto,
    file?: Express.Multer.File,
  ) {
    const existing =
      await this.findUsedOne(
        id,
      );

    let newProductImage:
      string | null = null;

    if (file) {
      newProductImage =
        await this.brandFiles.save(
          {
            buffer: file.buffer,
            mimetype: file.mimetype,
          },
          'brand-products',
        );
    }

    try {
      const data: {
        name?: string;
        productName?: string;
        category?: string;
        description?: string;
        productImage?: string;
        isPublished?: boolean;
      } = {};

      if (
        dto.name !== undefined
      ) {
        data.name =
          dto.name.trim();
      }

      if (
        dto.productName !==
        undefined
      ) {
        data.productName =
          dto.productName.trim();
      }

      if (
        dto.category !==
        undefined
      ) {
        data.category =
          dto.category.trim();
      }

      if (
        dto.description !==
        undefined
      ) {
        data.description =
          dto.description.trim();
      }

      if (
        dto.isPublished !==
        undefined
      ) {
        data.isPublished =
          dto.isPublished;
      }

      if (newProductImage) {
        data.productImage =
          newProductImage;
      }

      const updated =
        await this.prisma.db.orm.public.Brand
          .where({
            id,
            type: 'used',
          })
          .update(data);

      if (!updated) {
        throw new NotFoundException(
          'Produk tidak ditemukan.',
        );
      }

      if (
        newProductImage &&
        existing.productImage
      ) {
        await this.brandFiles.remove(
          existing.productImage,
        );
      }

      return updated;
    } catch (error) {
      if (newProductImage) {
        await this.brandFiles.remove(
          newProductImage,
        );
      }

      throw error;
    }
  }

  // =====================================================

  async deleteUsed(
    id: number,
  ) {
    const existing =
      await this.findUsedOne(
        id,
      );

    const deleted =
      await this.prisma.db.orm.public.Brand
        .where({
          id,
          type: 'used',
        })
        .delete();

    if (!deleted) {
      throw new NotFoundException(
        'Produk tidak ditemukan.',
      );
    }

    if (
      existing.productImage
    ) {
      await this.brandFiles.remove(
        existing.productImage,
      );
    }

    return deleted;
  }

  // =====================================================
  // PUBLIC PARTNER
  // =====================================================

  async findPublicPartners() {
    return this.prisma.db.orm.public.Brand
      .where({
        type: 'partner',
        isPublished: true,
      })
      .orderBy(
        (brand) =>
          brand.createdAt.asc(),
      )
      .all();
  }

  // =====================================================
  // PUBLIC USED
  // =====================================================

  async findPublicUsed() {
    return this.prisma.db.orm.public.Brand
      .where({
        type: 'used',
        isPublished: true,
      })
      .orderBy(
        (brand) =>
          brand.createdAt.asc(),
      )
      .all();
  }
}