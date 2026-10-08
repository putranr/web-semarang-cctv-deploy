import { Type } from 'class-transformer';

import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

/**
 * Pilihan sorting artikel.
 *
 * newest    = terbaru
 * oldest    = terlama
 * title-asc = judul A-Z
 * title-desc = judul Z-A
 */
export type PublicArticleSort =
  | 'newest'
  | 'oldest'
  | 'title-asc'
  | 'title-desc';

export class PublicArticlesQueryDto {
  /**
   * Nomor halaman.
   *
   * Default akan kita tentukan di service.
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  /**
   * Jumlah artikel per halaman.
   *
   * Kita batasi maksimal 12 supaya endpoint
   * publik tidak bisa diminta mengambil
   * ribuan artikel sekaligus.
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  limit?: number;

  /**
   * Kata kunci pencarian.
   *
   * Contoh:
   * search=cctv
   */
  @IsOptional()
  @IsString()
  search?: string;

  /**
   * Filter berdasarkan kategori.
   *
   * Contoh:
   * category=Tips CCTV
   */
  @IsOptional()
  @IsString()
  category?: string;

  /**
   * Sorting artikel.
   */
  @IsOptional()
  @IsIn([
    'newest',
    'oldest',
    'title-asc',
    'title-desc',
  ])
  sort?: PublicArticleSort;
}