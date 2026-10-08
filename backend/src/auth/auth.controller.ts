import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { LoginDto } from './dto/login.dto.js';

/**
 * Bentuk user yang ditempelkan
 * oleh JwtStrategy ke request.
 */
type AuthenticatedRequest =
  Request & {
    user: {
      userId: number;
      email: string;
      role: string;
    };
  };

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  /**
   * POST /auth/login
   *
   * Digunakan untuk login admin.
   */
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ) {
    return this.authService.login(
      loginDto.email,
      loginDto.password,
    );
  }

  /**
   * GET /auth/me
   *
   * Endpoint testing untuk memastikan
   * JWT berhasil diverifikasi.
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(
    @Req() request: AuthenticatedRequest,
  ) {
    return {
      message: 'Token valid',
      user: request.user,
    };
  }
}