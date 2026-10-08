import {
  Controller,
  Get,
} from '@nestjs/common';

import {
  ServicesService,
} from './services.service.js';

/**
 * Endpoint yang bisa diakses
 * website tanpa login.
 */
@Controller('public/services')
export class PublicServicesController {
  constructor(
    private readonly servicesService:
      ServicesService,
  ) {}

  /**
   * GET /public/services
   */
  @Get()
  findAll() {
    return this.servicesService.findPublic();
  }
}