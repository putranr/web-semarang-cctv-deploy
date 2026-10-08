import { Transform, Type } from 'class-transformer';

import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateServiceDto {
  /**
   * Nama layanan.
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * Deskripsi singkat.
   */
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * Penjelasan lengkap.
   */
  @IsString()
  @IsNotEmpty()
  detail: string;

  /**
   * Satu fitur per baris.
   *
   * Contoh:
   *
   * Survey lokasi
   * Pemasangan kamera
   * Konfigurasi DVR/NVR
   */
  @IsOptional()
  @IsString()
  features?: string;

  /**
   * Nama icon Lucide.
   *
   * Contoh:
   * Camera
   * Wrench
   * Settings
   * Cable
   */
  @IsOptional()
  @IsString()
  icon?: string;

  /**
   * Urutan tampilan.
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  displayOrder?: number;

  /**
   * FormData mengirim boolean sebagai string.
   */
  @IsOptional()
  @Transform(
    ({ value }) =>
      value === true ||
      value === 'true',
  )
  @IsBoolean()
  isPublished?: boolean;
}