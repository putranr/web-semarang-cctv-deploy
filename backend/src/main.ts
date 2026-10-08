import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';
import * as express from 'express';
import { join } from 'node:path';

async function bootstrap() {
  const app =
    await NestFactory.create(AppModule);

    /**
 * Menyajikan file gambar yang ada
 * di backend/uploads.
 *
 * Contoh:
 *
 * /uploads/articles/gambar.jpg
 */
app.use(
  '/uploads',
  express.static(
    join(
      process.cwd(),
      'uploads',
    ),
  ),
);

  app.enableCors({
  origin: 'http://localhost:5173',
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
   *
   * whitelist:
   * membuang property yang tidak didefinisikan
   * di DTO.
   *
   * forbidNonWhitelisted:
   * memberikan error kalau client mencoba
   * mengirim property tambahan.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /**
   * Memungkinkan NestJS menutup koneksi
   * database dengan rapi.
   */
  app.enableShutdownHooks();

  await app.listen(
    process.env['PORT'] ?? 3000,
  );
}

bootstrap();