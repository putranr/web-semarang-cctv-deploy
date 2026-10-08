import 'dotenv/config';

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtStrategy } from './jwt.strategy.js';
import { AdminGuard } from './admin.guard.js';

import { PrismaService } from '../prisma.service.js';

const jwtSecret = process.env['JWT_SECRET'];

if (!jwtSecret) {
  throw new Error(
    'JWT_SECRET belum diatur di file .env',
  );
}

@Module({
  imports: [
    /**
     * Passport digunakan sebagai
     * authentication layer.
     */
    PassportModule,

    /**
     * Konfigurasi JWT.
     */
    JwtModule.register({
      secret: jwtSecret,

      signOptions: {
        /**
         * Token berlaku 2 jam.
         */
        expiresIn: '2h',
      },
    }),
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    AuthService,
    JwtStrategy,
    AdminGuard,
    PrismaService,
  ],

  exports: [
    AuthService,
  ],
})
export class AuthModule {}