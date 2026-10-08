import {
  Controller,
  Get,
} from '@nestjs/common';

import {
  BusinessPartnersService,
} from './business-partners.service.js';

@Controller('public/business-partners')
export class PublicBusinessPartnersController {
  constructor(
    private readonly service: BusinessPartnersService,
  ) {}

  // =====================================================
  // PUBLIC MITRA BISNIS
  // =====================================================

  @Get()
  findPublic() {
    return this.service.findPublic();
  }
}