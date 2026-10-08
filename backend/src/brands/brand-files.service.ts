import {
  Injectable,
} from '@nestjs/common';

import {
  mkdir,
  unlink,
  writeFile,
} from 'fs/promises';

import {
  join,
} from 'path';

import {
  randomUUID,
} from 'crypto';

@Injectable()
export class BrandFilesService {
  // =====================================================
  // ROOT UPLOAD
  // =====================================================

  private readonly uploadRoot =
    join(
      process.cwd(),
      'uploads',
    );

  // =====================================================
  // SAVE FILE
  // =====================================================

  async save(
    file: {
      buffer: Buffer;
      mimetype: string;
    },
    folder:
      | 'brands'
      | 'brand-products'
      | 'business-partners',
  ) {
    // ---------------------------------------------------
    // Folder tujuan
    // ---------------------------------------------------

    const uploadDir =
      join(
        this.uploadRoot,
        folder,
      );

    // ---------------------------------------------------
    // Pastikan folder ada
    // ---------------------------------------------------

    await mkdir(
      uploadDir,
      {
        recursive: true,
      },
    );

    // ---------------------------------------------------
    // Mapping MIME type
    // ---------------------------------------------------

    const extensionMap:
      Record<string, string> = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/webp': '.webp',
      };

    const extension =
      extensionMap[
        file.mimetype
      ];

    if (!extension) {
      throw new Error(
        'Format gambar tidak didukung.',
      );
    }

    // ---------------------------------------------------
    // Nama file unik
    // ---------------------------------------------------

    const filename =
      `${randomUUID()}${extension}`;

    const filePath =
      join(
        uploadDir,
        filename,
      );

    // ---------------------------------------------------
    // Simpan file
    // ---------------------------------------------------

    await writeFile(
      filePath,
      file.buffer,
    );

    // ---------------------------------------------------
    // Path yang disimpan di database
    // ---------------------------------------------------

    return `/uploads/${folder}/${filename}`;
  }

  // =====================================================
  // REMOVE FILE
  // =====================================================

  async remove(
    filePath?: string | null,
  ) {
    if (!filePath) {
      return;
    }

    // ---------------------------------------------------
    // Hanya izinkan menghapus file upload yang memang
    // dikelola aplikasi kita.
    // ---------------------------------------------------

    const allowedPrefixes = [
      '/uploads/brands/',
      '/uploads/brand-products/',
      '/uploads/business-partners/',
    ];

    const allowed =
      allowedPrefixes.some(
        (prefix) =>
          filePath.startsWith(
            prefix,
          ),
      );

    if (!allowed) {
      return;
    }

    // ---------------------------------------------------
    // Ambil path relatif
    // ---------------------------------------------------

    const relativePath =
      filePath.replace(
        '/uploads/',
        '',
      );

    // ---------------------------------------------------
    // Path lengkap
    // ---------------------------------------------------

    const fullPath =
      join(
        this.uploadRoot,
        relativePath,
      );

    try {
      await unlink(
        fullPath,
      );
    } catch {
      // File sudah tidak ada.
    }
  }
}