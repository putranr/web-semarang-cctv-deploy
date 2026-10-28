
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from 'node:path';
import * as express from 'express';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Menyajikan gambar dari folder uploads.
   * Catatan: untuk production, gunakan storage
   * permanen agar gambar tidak hilang saat redeploy.
   */
  app.use(
    '/uploads',
    express.static(join(process.cwd(), 'uploads')),
  );

  /**
   * Izinkan frontend lokal dan domain production
   * yang ditentukan melalui FRONTEND_URL.
   */
  const allowedOrigins = [
    'http://localhost:5173',
    process.env['FRONTEND_URL'],
  ].filter((origin): origin is string => Boolean(origin));

  app.enableCors({
    origin: allowedOrigins,
    methods: [
      'GET',
      'HEAD',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
  });

  /**
   * Validasi semua request DTO.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /**
   * Tutup koneksi database dengan rapi
   * ketika aplikasi dihentikan.
   */
  app.enableShutdownHooks();

  await app.listen(process.env['PORT'] ?? 3000);
}

bootstrap();
