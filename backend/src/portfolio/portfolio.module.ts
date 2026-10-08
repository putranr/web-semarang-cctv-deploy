import { Module } from '@nestjs/common';

import {
  PortfolioController,
} from './portfolio.controller.js';

import {
  PublicPortfolioController,
} from './public-portfolio.controller.js';

import {
  PortfolioService,
} from './portfolio.service.js';

import {
  PortfolioFilesService,
} from './portfolio-files.service.js';

import {
  PrismaService,
} from '../prisma.service.js';

@Module({
  controllers: [
    PortfolioController,
    PublicPortfolioController,
  ],

  providers: [
    PortfolioService,
    PortfolioFilesService,
    PrismaService,
  ],
})
export class PortfolioModule {}