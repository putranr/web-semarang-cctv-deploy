import { Module } from '@nestjs/common';

import {
  ArticlesController,
} from './articles.controller.js';

import {
  PublicArticlesController,
} from './public-articles.controller.js';

import {
  ArticlesService,
} from './articles.service.js';

import {
  ArticleFilesService,
} from './article-files.service.js';

import {
  PrismaService,
} from '../prisma.service.js';

@Module({
  controllers: [
    ArticlesController,
    PublicArticlesController,
  ],

  providers: [
    ArticlesService,
    ArticleFilesService,
    PrismaService,
  ],
})
export class ArticlesModule {}