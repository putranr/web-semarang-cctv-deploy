import { Transform, Type } from 'class-transformer';

import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  cameras: number;

  @Type(() => Number)
  @IsInt()
  @Min(2000)
  @Max(2100)
  year: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * FormData mengirim nilai ini sebagai string.
   * Kita ubah menjadi boolean.
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