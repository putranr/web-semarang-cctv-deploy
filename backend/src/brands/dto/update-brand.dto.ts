import {
  IsBoolean,
  IsOptional,
} from 'class-validator';

import {
  Transform,
} from 'class-transformer';

export class UpdateBrandDto {
  @IsOptional()
  @Transform(
    ({ value }) =>
      value === true ||
      value === 'true',
  )
  @IsBoolean()
  isPublished?: boolean;
}