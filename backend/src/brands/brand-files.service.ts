
import { Injectable } from '@nestjs/common';

import {
  uploadImageToCloudinary,
  removeCloudinaryImage,
} from '../cloudinary-storage.js';

type BrandUploadFolder =
  | 'brands'
  | 'brand-products'
  | 'business-partners';

@Injectable()
export class BrandFilesService {
  /**
   * Upload gambar brand, produk, dan mitra bisnis
   * ke Cloudinary.
   *
   * URL hasil upload disimpan di database Neon.
   */
  async save(
    file: {
      buffer: Buffer;
      mimetype: string;
    },
    folder: BrandUploadFolder,
  ): Promise<string> {
    return uploadImageToCloudinary(
      file.buffer,
      `cctv-semarang/${folder}`,
      file.mimetype,
    );
  }

  /**
   * Menghapus gambar Cloudinary yang dikelola
   * aplikasi. Path lokal lama akan diabaikan.
   */
  async remove(
    filePath?: string | null,
  ): Promise<void> {
    await removeCloudinaryImage(filePath);
  }
}
