import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  Transform,
} from 'class-transformer';

export class CreateUsedBrandDto {
  // =====================================================
  // NAMA BRAND
  // =====================================================

  @IsString()
  name!: string;

  // =====================================================
  // NAMA PRODUK
  // =====================================================

  @IsString()
  productName!: string;

  // =====================================================
  // KATEGORI
  // =====================================================

  @IsString()
  category!: string;

  // =====================================================
  // DESKRIPSI
  // =====================================================

  @IsOptional()
  @IsString()
  description?: string;

  // =====================================================
  // PUBLISH
  // =====================================================

  @IsOptional()
  @Transform(
    ({ value }) =>
      value === true ||
      value === 'true',
  )
  @IsBoolean()
  isPublished?: boolean;
}