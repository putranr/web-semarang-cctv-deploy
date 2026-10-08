import {
  Injectable,
  type OnModuleDestroy,
} from '@nestjs/common';

import { db } from './prisma/db.js';

/**
 * PrismaService
 *
 * Service ini menjadi jembatan antara NestJS
 * dengan Prisma 8 database client.
 */
@Injectable()
export class PrismaService implements OnModuleDestroy {
  /**
   * Client Prisma 8.
   *
   * Client sebenarnya dibuat di:
   * src/prisma/db.ts
   */
  readonly db = db;

  /**
   * Dipanggil ketika aplikasi NestJS dimatikan.
   *
   * Tujuannya untuk menutup koneksi database
   * dengan rapi.
   */
  async onModuleDestroy() {
    await this.db.close();
  }
}