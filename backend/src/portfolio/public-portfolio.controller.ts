import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';

import {
  PortfolioService,
} from './portfolio.service.js';

@Controller('public/portfolio')
export class PublicPortfolioController {
  constructor(
    private readonly portfolioService:
      PortfolioService,
  ) {}

  /**
   * GET /public/portfolio
   *
   * Contoh:
   *
   * /public/portfolio
   *
   * /public/portfolio?category=Kantor
   *
   * /public/portfolio?limit=6
   */
  @Get()
  findAll(
    @Query('category')
    category?: string,

    @Query('limit')
    limit?: string,
  ) {
    const parsedLimit =
      Number(limit);

    return this.portfolioService.findPublic(
      category,
      Number.isFinite(
        parsedLimit,
      ) && parsedLimit > 0
        ? parsedLimit
        : 3,
    );
  }
}