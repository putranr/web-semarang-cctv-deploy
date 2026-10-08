import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import {
  JwtAuthGuard,
} from '../auth/jwt-auth.guard.js';

import {
  AdminGuard,
} from '../auth/admin.guard.js';

import {
  DashboardService,
} from './dashboard.service.js';

@Controller('admin/dashboard')
@UseGuards(
  JwtAuthGuard,
  AdminGuard,
)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  // =====================================================
  // GET /admin/dashboard
  // =====================================================

  @Get()
  getSummary() {
    return this.dashboardService.getSummary();
  }
}