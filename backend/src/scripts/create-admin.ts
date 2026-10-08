import 'dotenv/config';

import * as bcrypt from 'bcryptjs';

import { db } from '../prisma/db.js';

/**
 * Script untuk membuat akun admin pertama.
 *
 * Jalankan hanya saat setup awal.
 */
async function main() {
  /**
   * Data admin dibaca dari .env.
   */
  const email =
    process.env['ADMIN_EMAIL'];

  const password =
    process.env['ADMIN_PASSWORD'];

  const name =
    process.env['ADMIN_NAME'] ??
    'Administrator';

  const username =
    process.env['ADMIN_USERNAME'] ??
    'admin';

  /**
   * Pastikan semua data tersedia.
   */
  if (!email || !password) {
    throw new Error(
      'ADMIN_EMAIL dan ADMIN_PASSWORD harus ada di .env',
    );
  }

  /**
   * Cari apakah admin dengan email tersebut
   * sudah ada.
   */
  const existingUser =
    await db.orm.public.User.first({
      email,
    });

  /**
   * Hash password.
   *
   * 12 = cost factor bcrypt.
   */
  const passwordHash =
    await bcrypt.hash(password, 12);

  if (existingUser) {
    /**
     * Kalau sudah ada,
     * update data admin.
     */
    await db.orm.public.User
      .where({ email })
      .update({
        name,
        username,
        password: passwordHash,
        role: 'admin',
      });

    console.log(
      '✅ Admin berhasil diperbarui:',
      email,
    );
  } else {
    /**
     * Kalau belum ada,
     * buat user baru.
     */
    await db.orm.public.User.create({
      name,
      email,
      username,
      password: passwordHash,
      role: 'admin',
    });

    console.log(
      '✅ Admin berhasil dibuat:',
      email,
    );
  }

  /**
   * Tutup koneksi database.
   */
  await db.close();
}

main().catch((error) => {
  console.error(
    '❌ Gagal membuat admin:',
    error,
  );

  process.exit(1);
});