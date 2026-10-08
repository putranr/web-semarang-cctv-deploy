import {
  Module,
} from '@nestjs/common';

import {
  BrandsController,
} from './brands.controller.js';

import {
  UsedBrandsController,
} from './used-brands.controller.js';

import {
  PublicBrandsController,
} from './public-brands.controller.js';

import {
  BrandsService,
} from './brands.service.js';

import {
  BrandFilesService,
} from './brand-files.service.js';

import {
  PrismaService,
} from '../prisma.service.js';

@Module({
  controllers: [
    BrandsController,

    UsedBrandsController,

    PublicBrandsController,
  ],

  providers: [
    BrandsService,

    BrandFilesService,

    PrismaService,
  ],

  exports: [
    BrandsService,
  ],
})
export class BrandsModule {}