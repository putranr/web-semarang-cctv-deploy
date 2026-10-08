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
  PortfolioService,
} from './portfolio.service.js';

import {
  CreatePortfolioDto,
} from './dto/create-portfolio.dto.js';

import {
  UpdatePortfolioDto,
} from './dto/update-portfolio.dto.js';

const imagePipe =
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
    });

/**
 * ADMIN PORTFOLIO
 */
@Controller('portfolio')
@UseGuards(
  JwtAuthGuard,
  AdminGuard,
)
export class PortfolioController {
  constructor(
    private readonly portfolioService:
      PortfolioService,
  ) {}

  /**
   * GET /portfolio
   */
  @Get()
  findAll() {
    return this.portfolioService.findAll();
  }

  /**
   * GET /portfolio/:id
   */
  @Get(':id')
  findOne(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.portfolioService.findOne(
      id,
    );
  }

  /**
   * POST /portfolio
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
    dto: CreatePortfolioDto,

    @UploadedFile(
      imagePipe,
    )
    file:
      Express.Multer.File,
  ) {
    return this.portfolioService.create(
      dto,
      file,
    );
  }

  /**
   * PATCH /portfolio/:id
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
    dto: UpdatePortfolioDto,

    @UploadedFile(
      imagePipe,
    )
    file:
      Express.Multer.File,
  ) {
    return this.portfolioService.update(
      id,
      dto,
      file,
    );
  }

  /**
   * DELETE /portfolio/:id
   */
  @Delete(':id')
  remove(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.portfolioService.remove(
      id,
    );
  }
}