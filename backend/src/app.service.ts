import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Endpoint sederhana untuk mengecek
   * apakah API NestJS sedang berjalan.
   */
  getStatus() {
    return {
      message: 'CCTV Semarang API is running',
      status: 'ok',
    };
  }
}