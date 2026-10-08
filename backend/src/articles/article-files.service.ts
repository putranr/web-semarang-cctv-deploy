import {
  Injectable,
} from '@nestjs/common';

import {
  mkdir,
  unlink,
  writeFile,
} from 'node:fs/promises';

import {
  basename,
  extname,
  join,
} from 'node:path';

import {
  randomUUID,
} from 'node:crypto';

import type { Express } from 'express';

/**
 * Service khusus untuk menangani
 * file gambar artikel.
 */
@Injectable()
export class ArticleFilesService {
  /**
   * Semua gambar artikel disimpan
   * di backend/uploads/articles.
   */
  private readonly uploadDirectory =
    join(
      process.cwd(),
      'uploads',
      'articles',
    );

  /**
   * Simpan gambar ke filesystem.
   */
  async save(
    file: Express.Multer.File,
  ): Promise<string> {
    /**
     * Pastikan folder tersedia.
     *
     * recursive: true berarti folder
     * akan dibuat jika belum ada.
     */
    await mkdir(
      this.uploadDirectory,
      {
        recursive: true,
      },
    );

    /**
     * Ekstensi file ditentukan berdasarkan
     * MIME type yang sudah divalidasi.
     */
    const extension =
      this.getExtension(
        file.mimetype,
      );

    /**
     * Gunakan UUID sebagai nama file.
     *
     * Contoh:
     *
     * 4f0e6c7d-....jpg
     *
     * Hal ini menghindari bentrok jika
     * admin mengupload file bernama:
     *
     * cctv.jpg
     *
     * berkali-kali.
     */
    const filename =
      `${randomUUID()}${extension}`;

    const filePath =
      join(
        this.uploadDirectory,
        filename,
      );

    /**
     * Karena menggunakan memoryStorage,
     * isi file berada di file.buffer.
     */
    await writeFile(
      filePath,
      file.buffer,
    );

    /**
     * Yang disimpan ke database hanyalah
     * URL/path relatif.
     */
    return `/uploads/articles/${filename}`;
  }

  /**
   * Menghapus file gambar artikel.
   */
  async remove(
    imagePath: string | null | undefined,
  ) {
    if (!imagePath) {
      return;
    }

    /**
     * Kita hanya mengizinkan service ini
     * menghapus file dari folder uploads/articles.
     */
    if (
      !imagePath.startsWith(
        '/uploads/articles/',
      )
    ) {
      return;
    }

    /**
     * basename digunakan agar path
     * tidak bisa diarahkan keluar folder
     * melalui ../
     */
    const filename =
      basename(imagePath);

    const filePath =
      join(
        this.uploadDirectory,
        filename,
      );

    try {
      await unlink(filePath);
    } catch (error) {
      /**
       * Kalau file memang sudah tidak ada,
       * tidak perlu dianggap error.
       */
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'ENOENT'
      ) {
        return;
      }

      throw error;
    }
  }

  /**
   * Mengubah MIME type menjadi ekstensi.
   */
  private getExtension(
    mimeType: string,
  ) {
    switch (mimeType) {
      case 'image/jpeg':
        return '.jpg';

      case 'image/png':
        return '.png';

      case 'image/webp':
        return '.webp';

      default:
        /**
         * Seharusnya tidak pernah tercapai
         * karena file sudah divalidasi di controller.
         */
        throw new Error(
          `Unsupported image type: ${mimeType}`,
        );
    }
  }
}