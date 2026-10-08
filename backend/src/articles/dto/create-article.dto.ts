import {
  Transform,
} from 'class-transformer';

import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  /**
   * Judul artikel.
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * Slug artikel.
   */
  @IsString()
  @IsNotEmpty()
  slug: string;

  /**
   * Kategori artikel.
   */
  @IsString()
  @IsNotEmpty()
  category: string;

  /**
   * Ringkasan artikel.
   */
  @IsString()
  @IsNotEmpty()
  excerpt: string;

  /**
   * Isi artikel.
   */
  @IsString()
  @MinLength(10)
  content: string;

  /**
   * Status publikasi.
   *
   * Karena berasal dari FormData,
   * kemungkinan nilainya adalah:
   *
   * "true"
   * atau
   * "false"
   *
   * Transform mengubahnya menjadi
   * boolean asli.
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