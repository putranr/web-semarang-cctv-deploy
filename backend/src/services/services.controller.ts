import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { AdminGuard } from '../auth/admin.guard.js';

import {
  ServicesService,
} from './services.service.js';

import {
  CreateServiceDto,
} from './dto/create-service.dto.js';

import {
  UpdateServiceDto,
} from './dto/update-service.dto.js';

@Controller('services')
@UseGuards(
  JwtAuthGuard,
  AdminGuard,
)
export class ServicesController {
  constructor(
    private readonly servicesService:
      ServicesService,
  ) {}

  /**
   * GET /services
   */
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  /**
   * GET /services/:id
   */
  @Get(':id')
  findOne(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.servicesService.findOne(
      id,
    );
  }

  /**
   * POST /services
   */
  @Post()
  create(
    @Body()
    dto: CreateServiceDto,
  ) {
    return this.servicesService.create(
      dto,
    );
  }

  /**
   * PATCH /services/:id
   */
  @Patch(':id')
  update(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

    @Body()
    dto: UpdateServiceDto,
  ) {
    return this.servicesService.update(
      id,
      dto,
    );
  }

  /**
   * DELETE /services/:id
   */
  @Delete(':id')
  remove(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.servicesService.remove(
      id,
    );
  }
}
