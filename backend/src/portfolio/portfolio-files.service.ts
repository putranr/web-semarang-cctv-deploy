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
  join,
} from 'node:path';

import {
  randomUUID,
} from 'node:crypto';

import type { Express } from 'express';

@Injectable()
export class PortfolioFilesService {
  /**
   * Folder:
   *
   * backend/uploads/portfolio
   */
  private readonly uploadDirectory =
    join(
      process.cwd(),
      'uploads',
      'portfolio',
    );

  /**
   * Simpan gambar portfolio.
   */
  async save(
    file: Express.Multer.File,
  ): Promise<string> {
    await mkdir(
      this.uploadDirectory,
      {
        recursive: true,
      },
    );

    const extension =
      this.getExtension(
        file.mimetype,
      );

    const filename =
      `${randomUUID()}${extension}`;

    const filePath =
      join(
        this.uploadDirectory,
        filename,
      );

    await writeFile(
      filePath,
      file.buffer,
    );

    return `/uploads/portfolio/${filename}`;
  }

  /**
   * Hapus gambar portfolio.
   */
  async remove(
    imagePath:
      | string
      | null
      | undefined,
  ) {
    if (!imagePath) {
      return;
    }

    if (
      !imagePath.startsWith(
        '/uploads/portfolio/',
      )
    ) {
      return;
    }

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
   * Ekstensi berdasarkan MIME type.
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
        throw new Error(
          `Unsupported image type: ${mimeType}`,
        );
    }
  }
}