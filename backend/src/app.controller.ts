import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * GET /
   *
   * Hanya digunakan sebagai health check sederhana.
   * Tidak mengambil data User dari database.
   */
  @Get()
  getStatus() {
    return this.appService.getStatus();
  }
}