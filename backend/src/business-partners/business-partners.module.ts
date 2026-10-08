import {
  Module,
} from '@nestjs/common';

import {
  BusinessPartnersController,
} from './business-partners.controller.js';

import {
  PublicBusinessPartnersController,
} from './public-business-partners.controller.js';

import {
  BusinessPartnersService,
} from './business-partners.service.js';

import {
  BrandFilesService,
} from '../brands/brand-files.service.js';

import {
  PrismaService,
} from '../prisma.service.js';

@Module({
  controllers: [
    BusinessPartnersController,

    PublicBusinessPartnersController,
  ],

  providers: [
    BusinessPartnersService,

    BrandFilesService,

    PrismaService,
  ],

  exports: [
    BusinessPartnersService,
  ],
})
export class BusinessPartnersModule {}