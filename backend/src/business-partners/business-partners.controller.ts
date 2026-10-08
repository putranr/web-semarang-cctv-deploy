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
  BusinessPartnersService,
} from './business-partners.service.js';

import {
  CreateBusinessPartnerDto,
} from './dto/create-business-partner.dto.js';

import {
  UpdateBusinessPartnerDto,
} from './dto/update-business-partner.dto.js';

@Controller('business-partners')
@UseGuards(
  JwtAuthGuard,
  AdminGuard,
)
export class BusinessPartnersController {
  constructor(
    private readonly service: BusinessPartnersService,
  ) {}

  // =====================================================
  // GET ALL ADMIN
  // =====================================================

  @Get()
  findAll() {
    return this.service.findAll();
  }

  // =====================================================
  // GET ONE
  // =====================================================

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findOne(
      id,
    );
  }

  // =====================================================
  // CREATE
  // =====================================================

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'image',
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
    dto: CreateBusinessPartnerDto,

    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    this.validateImage(
      file,
    );

    return this.service.create(
      dto,
      file,
    );
  }

  // =====================================================
  // UPDATE
  // =====================================================

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor(
      'image',
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
    dto: UpdateBusinessPartnerDto,

    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    this.validateImage(
      file,
    );

    return this.service.update(
      id,
      dto,
      file,
    );
  }

  // =====================================================
  // DELETE
  // =====================================================

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.remove(
      id,
    );
  }

  // =====================================================
  // VALIDASI GAMBAR
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