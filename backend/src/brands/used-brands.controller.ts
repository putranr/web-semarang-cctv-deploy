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
  CreateUsedBrandDto,
} from './dto/create-used-brand.dto.js';

import {
  UpdateUsedBrandDto,
} from './dto/update-used-brand.dto.js';

@Controller('used-brands')
@UseGuards(
  JwtAuthGuard,
  AdminGuard,
)
export class UsedBrandsController {
  constructor(
    private readonly brandsService: BrandsService,
  ) {}

  // =====================================================
  // GET ALL PRODUCT
  // =====================================================

  @Get()
  findAll() {
    return this.brandsService.findUsed();
  }

  // =====================================================
  // GET ONE
  // =====================================================

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.brandsService.findUsedOne(
      id,
    );
  }

  // =====================================================
  // CREATE PRODUCT
  // =====================================================

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'productImage',
      {
        storage:
          memoryStorage(),

        limits: {
          fileSize:
            5 * 1024 * 1024,
        },
      },
    ),
  )
  create(
    @Body()
    dto: CreateUsedBrandDto,

    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    this.validateImage(
      file,
    );

    return this.brandsService.createUsed(
      dto,
      file,
    );
  }

  // =====================================================
  // UPDATE PRODUCT
  // =====================================================

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor(
      'productImage',
      {
        storage:
          memoryStorage(),

        limits: {
          fileSize:
            5 * 1024 * 1024,
        },
      },
    ),
  )
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateUsedBrandDto,

    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    this.validateImage(
      file,
    );

    return this.brandsService.updateUsed(
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
    return this.brandsService.deleteUsed(
      id,
    );
  }

  // =====================================================
  // VALIDATE IMAGE
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