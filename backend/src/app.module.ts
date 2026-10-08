import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma.service.js';
import { AuthModule } from './auth/auth.module.js';
import { ArticlesModule } from './articles/articles.module.js';
import { PortfolioModule } from './portfolio/portfolio.module.js';
import { ServicesModule } from './services/services.module.js';
import { BrandsModule } from './brands/brands.module.js';
import { BusinessPartnersModule, } from './business-partners/business-partners.module.js';
import { DashboardModule, } from './dashboard/dashboard.module.js';

@Module({
  imports: [AuthModule, ArticlesModule, PortfolioModule, ServicesModule, BrandsModule, BusinessPartnersModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
