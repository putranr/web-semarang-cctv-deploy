
import { v2 as cloudinary } from 'cloudinary';
import { randomUUID } from 'node:crypto';

const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

function configureCloudinary(): string {
  const cloudName = process.env['CLOUDINARY_CLOUD_NAME'];
  const apiKey = process.env['CLOUDINARY_API_KEY'];
  const apiSecret = process.env['CLOUDINARY_API_SECRET'];

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      'Cloudinary credentials belum dikonfigurasi.',
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  return cloudName;
}

/**
 * Upload buffer gambar ke Cloudinary.
 * Mengembalikan URL HTTPS untuk disimpan ke database.
 */
export async function uploadImageToCloudinary(
  buffer: Buffer,
  folder: string,
  mimeType: string,
): Promise<string> {
  if (!ALLOWED_IMAGE_TYPES.has(mimeType)) {
    throw new Error('Format gambar tidak didukung.');
  }

  configureCloudinary();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        public_id: randomUUID(),
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          reject(
            new Error('Gagal mengunggah gambar ke Cloudinary.'),
          );
          return;
        }

        if (!result?.secure_url) {
          reject(
            new Error('Cloudinary tidak mengembalikan URL gambar.'),
          );
          return;
        }

        resolve(result.secure_url);
      },
    );

    stream.end(buffer);
  });
}

/**
 * Menghapus gambar yang berasal dari akun Cloudinary kita.
 * Path lokal lama seperti /uploads/articles/foto.jpg
 * tidak akan diperlakukan sebagai aset Cloudinary.
 */
export async function removeCloudinaryImage(
  imageUrl: string | null | undefined,
): Promise<void> {
  if (!imageUrl) {
    return;
  }

  try {
    const cloudName = configureCloudinary();
    const url = new URL(imageUrl);

    if (url.hostname !== 'res.cloudinary.com') {
      return;
    }

    const segments = url.pathname
      .split('/')
      .filter(Boolean);

    if (
      segments[0] !== cloudName ||
      segments[1] !== 'image' ||
      segments[2] !== 'upload'
    ) {
      return;
    }

    const assetSegments = segments.slice(3);

    // URL Cloudinary biasanya menyertakan versi v123456.
    if (
      assetSegments.length > 0 &&
      /^v\d+$/.test(assetSegments[0])
    ) {
      assetSegments.shift();
    }

    const publicId = assetSegments
      .join('/')
      .replace(/\.[^/.]+$/, '');

    if (!publicId) {
      return;
    }

    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
      invalidate: true,
    });
  } catch (error) {
    // Kegagalan menghapus gambar lama tidak boleh
    // membatalkan operasi database yang sudah berhasil.
    console.error(
      'Gagal menghapus gambar Cloudinary:',
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
}
