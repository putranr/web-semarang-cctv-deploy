
import { Injectable } from '@nestjs/common';
import type { Express } from 'express';

import {
  uploadImageToCloudinary,
  removeCloudinaryImage,
} from '../cloudinary-storage.js';

@Injectable()
export class PortfolioFilesService {
  /**
   * Upload gambar portofolio ke Cloudinary.
   * URL HTTPS hasil upload akan disimpan ke database.
   */
  async save(file: Express.Multer.File): Promise<string> {
    return uploadImageToCloudinary(
      file.buffer,
      'cctv-semarang/portfolio',
      file.mimetype,
    );
  }

  /**
   * Hapus gambar portofolio lama dari Cloudinary.
   * Path lokal lama akan diabaikan oleh helper.
   */
  async remove(
    imagePath: string | null | undefined,
  ): Promise<void> {
    await removeCloudinaryImage(imagePath);
  }
}
