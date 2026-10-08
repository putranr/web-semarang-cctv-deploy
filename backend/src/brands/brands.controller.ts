import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  FileInterceptor,
} from '@nestjs/platform-express';

import {
  memoryStorage,
} from 'multer';

import {
  JwtAuthGuard,
} from '../auth/jwt-auth.guard.js';

import {
  AdminGuard,
} from '../auth/admin.guard.js';

import {
  BrandsService,
} from './brands.service.js';

import {
  CreateBrandDto,
} from './dto/create-brand.dto.js';

import {
  UpdateBrandDto,
} from './dto/update-brand.dto.js';

@Controller('brands')
@UseGuards(
  JwtAuthGuard,
  AdminGuard,
)
export class BrandsController {
  constructor(
    private readonly brandsService: BrandsService,
  ) {}

  // =====================================================
  // GET PARTNER
  // =====================================================

  @Get()
  findAll() {
    return this.brandsService.findPartners();
  }

  // =====================================================
  // GET ONE
  // =====================================================

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.brandsService.findPartner(
      id,
    );
  }

  // =====================================================
  // CREATE
  // =====================================================

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage:
        memoryStorage(),

      limits: {
        fileSize:
          5 * 1024 * 1024,
      },
    }),
  )
  create(
    @Body()
    dto: CreateBrandDto,

    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    this.validateImage(
      file,
    );

    return this.brandsService.createPartner(
      dto,
      file,
    );
  }

  // =====================================================
  // UPDATE
  // =====================================================

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage:
        memoryStorage(),

      limits: {
        fileSize:
          5 * 1024 * 1024,
      },
    }),
  )
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateBrandDto,

    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    this.validateImage(
      file,
    );

    return this.brandsService.updatePartner(
      id,
      dto,
      file,
    );
  }

  // =====================================================
  // DELETE
  // =====================================================

  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.brandsService.deletePartner(
      id,
    );
  }

  // =====================================================
  // IMAGE VALIDATION
  // =====================================================

  private validateImage(
    file?: Express.Multer.File,
  ) {
    if (!file) {
      return;
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (
      !allowedTypes.includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException(
        'Gambar harus berupa JPG, PNG, atau WebP.',
      );
    }
  }
}