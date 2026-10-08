import {
  Controller,
  Get,
} from '@nestjs/common';

import {
  BrandsService,
} from './brands.service.js';

@Controller('public')
export class PublicBrandsController {
  constructor(
    private readonly brandsService: BrandsService,
  ) {}

  // =====================================================
  // BRAND PARTNER
  // =====================================================

  @Get('brands')
  getPartners() {
    return this.brandsService.findPublicPartners();
  }

  // =====================================================
  // PRODUK YANG KAMI GUNAKAN
  // =====================================================

  @Get('brands-used')
  getUsedProducts() {
    return this.brandsService.findPublicUsed();
  }
}