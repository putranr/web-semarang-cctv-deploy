
import { Injectable } from '@nestjs/common';
import type { Express } from 'express';

import {
  uploadImageToCloudinary,
  removeCloudinaryImage,
} from '../cloudinary-storage.js';

/**
 * Menangani upload dan penghapusan gambar artikel.
 * Gambar disimpan secara permanen di Cloudinary,
 * bukan di filesystem lokal Vercel.
 */
@Injectable()
export class ArticleFilesService {
  /**
   * Upload gambar artikel dan kembalikan URL HTTPS.
   */
  async save(file: Express.Multer.File): Promise<string> {
    return uploadImageToCloudinary(
      file.buffer,
      'cctv-semarang/articles',
      file.mimetype,
    );
  }

  /**
   * Hapus aset Cloudinary saat gambar diganti atau
   * artikel dihapus. Path upload lokal yang lama
   * akan diabaikan oleh helper.
   */
  async remove(
    imagePath: string | null | undefined,
  ): Promise<void> {
    await removeCloudinaryImage(imagePath);
  }
}
