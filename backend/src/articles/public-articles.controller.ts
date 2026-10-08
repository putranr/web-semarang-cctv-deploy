import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';

import { ArticlesService } from './articles.service.js';

import {
  PublicArticlesQueryDto,
} from './dto/public-articles-query.dto.js';

/**
 * Controller untuk website publik.
 *
 * TIDAK menggunakan:
 * JwtAuthGuard
 * AdminGuard
 *
 * Artinya endpoint ini bisa diakses
 * tanpa login.
 */
@Controller('public/articles')
export class PublicArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
  ) {}

  /**
   * GET /public/articles
   *
   * Contoh:
   *
   * /public/articles?page=1&limit=3
   *
   * /public/articles?search=cctv
   *
   * /public/articles?category=Tips%20CCTV
   *
   * /public/articles?sort=title-asc
   */
  @Get()
  findAll(
    @Query()
    query: PublicArticlesQueryDto,
  ) {
    return this.articlesService.findPublic(
      query,
    );
  }
}