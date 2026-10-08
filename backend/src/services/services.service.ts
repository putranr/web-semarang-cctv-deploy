import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma.service.js';

import {
  CreateServiceDto,
} from './dto/create-service.dto.js';

import {
  UpdateServiceDto,
} from './dto/update-service.dto.js';

@Injectable()
export class ServicesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * ============================================
   * ADMIN - GET ALL
   * ============================================
   */
  async findAll() {
    return this.prisma.db.orm.public.Service
      .orderBy([
        (service) =>
          service.displayOrder.asc(),

        (service) =>
          service.id.asc(),
      ])
      .all();
  }

  /**
   * ============================================
   * ADMIN - GET ONE
   * ============================================
   */
  async findOne(id: number) {
    const service =
      await this.prisma.db.orm.public.Service.first({
        id,
      });

    if (!service) {
      throw new NotFoundException(
        'Layanan tidak ditemukan',
      );
    }

    return service;
  }

  /**
   * ============================================
   * CREATE
   * ============================================
   */
  async create(
    dto: CreateServiceDto,
  ) {
    return this.prisma.db.orm.public.Service.create({
      title: dto.title,
      description:
        dto.description,
      detail: dto.detail,

      /*
       * Simpan fitur sebagai satu teks,
       * satu fitur per baris.
       */
      features:
        dto.features ?? '',

      icon:
        dto.icon ?? 'Camera',

      displayOrder:
        dto.displayOrder ?? 0,

      isPublished:
        dto.isPublished ?? true,
    });
  }

  /**
   * ============================================
   * UPDATE
   * ============================================
   */
  async update(
    id: number,
    dto: UpdateServiceDto,
  ) {
    const existing =
      await this.prisma.db.orm.public.Service.first({
        id,
      });

    if (!existing) {
      throw new NotFoundException(
        'Layanan tidak ditemukan',
      );
    }

    return this.prisma.db.orm.public.Service
      .where({ id })
      .update({
        ...dto,
      });
  }

  /**
   * ============================================
   * DELETE
   * ============================================
   */
  async remove(id: number) {
    const existing =
      await this.prisma.db.orm.public.Service.first({
        id,
      });

    if (!existing) {
      throw new NotFoundException(
        'Layanan tidak ditemukan',
      );
    }

    return this.prisma.db.orm.public.Service
      .where({ id })
      .delete();
  }

  /**
   * ============================================
   * PUBLIC
   * ============================================
   */
  async findPublic() {
    const services =
      await this.prisma.db.orm.public.Service
        .where({
          isPublished: true,
        })
        .orderBy([
          (service) =>
            service.displayOrder.asc(),

          (service) =>
            service.id.asc(),
        ])
        .all();

    /**
     * Ubah features dari String
     * menjadi Array String.
     */
    return services.map(
      (service) => ({
        ...service,

        features:
          service.features
            .split(/\r?\n/)
            .map(
              (feature) =>
                feature.trim(),
            )
            .filter(
              Boolean,
            ),
      }),
    );
  }
}