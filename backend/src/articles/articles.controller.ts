import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
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

import type { Express } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { AdminGuard } from '../auth/admin.guard.js';

import {
  ArticlesService,
} from './articles.service.js';

import {
  CreateArticleDto,
} from './dto/create-article.dto.js';

import {
  UpdateArticleDto,
} from './dto/update-article.dto.js';

@Controller('articles')
@UseGuards(
  JwtAuthGuard,
  AdminGuard,
)
export class ArticlesController {
  constructor(
    private readonly articlesService:
      ArticlesService,
  ) {}

  /**
   * ==================================================
   * FILE VALIDATOR
   * ==================================================
   *
   * Kita hanya menerima:
   *
   * JPEG
   * PNG
   * WebP
   *
   * Maksimum:
   * 5 MB
   */

  /**
   * ==================================================
   * GET /articles
   * ==================================================
   */
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  /**
   * ==================================================
   * GET /articles/:id
   * ==================================================
   */
  @Get(':id')
  findOne(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.articlesService.findOne(
      id,
    );
  }

  /**
   * ==================================================
   * POST /articles
   * ==================================================
   *
   * Sekarang request menggunakan:
   *
   * multipart/form-data
   *
   * field:
   * image
   */
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
    dto: CreateArticleDto,

    @UploadedFile(
  new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType:
        /^image\/(jpeg|png|webp)$/,
    })
    .addMaxSizeValidator({
      maxSize:
        5 * 1024 * 1024,
    })
    .build({
      fileIsRequired: false,
      errorHttpStatusCode:
        HttpStatus.UNPROCESSABLE_ENTITY,
    }),
    )
    file:
      Express.Multer.File,
  ) {
    return this.articlesService.create(
      dto,
      file,
    );
  }

  /**
   * ==================================================
   * PATCH /articles/:id
   * ==================================================
   *
   * Bisa update data + gambar baru.
   *
   * Kalau admin tidak memilih gambar,
   * gambar lama tetap digunakan.
   */
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
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

    @Body()
    dto: UpdateArticleDto,

    @UploadedFile(
      /**
       * Validasi file gambar.
       */
    )
    file:
      Express.Multer.File,
  ) {
    return this.articlesService.update(
      id,
      dto,
      file,
    );
  }

  /**
   * ==================================================
   * DELETE /articles/:id
   * ==================================================
   */
  @Delete(':id')
  remove(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.articlesService.remove(
      id,
    );
  }
}